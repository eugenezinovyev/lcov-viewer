import Prism from 'prismjs';
import generateUniqueId from '../utilities/generateUniqueId';
import filterTagTokens from './filterTagTokens';
import { UncoveredBranch, UncoveredBranchEnd, UncoveredBranchStart } from './tokens';

const TagsToFilter = [
  UncoveredBranchStart,
  UncoveredBranchEnd,
];

function createTokenize(uncoveredBranchTag, language) {
  const startTag = `start-${uncoveredBranchTag}`;
  const endTag = `end-${uncoveredBranchTag}`;
  const uncoveredBranch = {
    pattern: new RegExp(`${startTag}((?!${endTag}).)*?${endTag}`, 's'),
    greedy: true,
    inside: {
      [UncoveredBranchStart]: new RegExp(startTag),
      [UncoveredBranchEnd]: new RegExp(endTag),
      // we can either make them greedy and add base grammar after
      // OR we can remove them from token stream and run a separate highlight on the rest of the 'uncovered-branch' content
      // OR we can leave them as is to have no highlighting inside the 'uncovered-branch' content (the option I went with because it lloks
      // slightly better to have no highlighting for the 'uncovered-branch' content)
    },
  };

  uncoveredBranch.inside[UncoveredBranch] = uncoveredBranch;

  const grammar = {
    ...Prism.languages[language],
    [UncoveredBranch]: uncoveredBranch,
  };

  return {
    startTag,
    endTag,
    tokenize: (text) => {
      const tokens = Prism.tokenize(text, grammar);

      return filterTagTokens(tokens, TagsToFilter);
    },
  };
}

// merges nested and intersecting insertions
function mergeInsertions(insertions) {
  // sort insertions by line then by col ASC
  insertions.sort((a, b) => a.line !== b.line ? a.line - b.line : a.col - b.col);

  const mergedInsertions = [];
  let lastInsertion = null;
  let openBranches = 0;

  insertions.forEach(insertion => {
    if (!lastInsertion && insertion.type === 'start') { // just a silly check to make sure we start with 'start' tag
      lastInsertion = insertion;
      mergedInsertions.push(insertion);
      openBranches++;

      return;
    }

    if (insertion.type === 'start') {
      if (openBranches === 0) {
        mergedInsertions.push(insertion);
        lastInsertion = insertion;
      }

      openBranches++;
    }

    if (insertion.type === 'end') {
      if (openBranches === 1) {
        mergedInsertions.push(insertion);
        lastInsertion = insertion;
      }

      openBranches--;
    }
  });

  // just for security, we don't want to do anything else if we don't have any insertions
  if (!mergedInsertions.length) {
    return mergedInsertions;
  }

  // another silly check to make sure we don't end with 'start' tag
  if (mergedInsertions[mergedInsertions.length - 1].type === 'start') {
    mergedInsertions.pop();
  }

  return mergedInsertions;
}

function insertBranchTags(lines, branchMap, branchCoverage, startTag, endTag) {
  if (!branchCoverage || !branchCoverage) {
    return;
  }

  const insertions = [];

  Object.entries(branchCoverage).forEach(([branchId, hitsArray]) => {
    // BTW, I don't know how hitsArray can contain more than 1 element, never seen it happen.
    // However, I'll treat it as an array just in case.
    hitsArray.forEach((hits, index) => {
      if (hits > 0) {
        return;
      }

      const branch = branchMap[branchId];
      const { start, end } = branch.locations[index];
      const startLineIndex = start.line - 1;
      const endLineIndex = end.line - 1;
      const startCol = Math.max(start.column, 0); // sometimes start.column is less than 0 (e.g. when there is an empty line)
      const endCol = end.column + 1;

      insertions.push({ line: startLineIndex, col: startCol, tag: startTag, type: 'start' });
      insertions.push({ line: endLineIndex, col: endCol, tag: endTag, type: 'end' });
    });
  });

  // we don't want to display uncovered branches inside other uncovered branches
  const mergedInsertions = mergeInsertions(insertions);

  // sorting is important because we need to insert tags from the end of the file to the beginning
  // sort by line first, then by col DESC
  mergedInsertions
    .sort((a, b) => a.line !== b.line ? a.line - b.line : b.col - a.col)
    .forEach(({ line, col, tag }) => {
      const lineTextBefore = lines[line].slice(0, col);
      const lineTextAfter = lines[line].slice(col);

      lines[line] = `${lineTextBefore}${tag}${lineTextAfter}`;
    });
}

export default function tokenize(details) {
  const language = 'javascript'; // TODO: get language from file extension
  const { branchMap, branchCoverage } = details;
  const lines = details.lines.map(l => l.text); // do not mess with the existing lines array
  const [uncoveredTag, successfullyGeneratedId] = generateUniqueId(lines);

  /*
   * if we failed to generate unique id, then something is terribly wrong with the code
   * and we should not try to insert tags into it
   */
  if (!successfullyGeneratedId) {
    return Prism.tokenize(lines.join('\n'), Prism.languages[language]);
  }

  const { startTag, endTag, tokenize: tokenizer } = createTokenize(uncoveredTag, language);

  insertBranchTags(lines, branchMap, branchCoverage, startTag, endTag);

  return tokenizer(lines.join('\n'));
}
