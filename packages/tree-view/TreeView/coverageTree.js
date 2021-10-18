export const BRANCH_NODE = 'branch';
export const LEAF_NODE = 'leaf';

export const buildCoverageTree = (coverage) => {
  const root = { type: BRANCH_NODE, name: 'All Files', children: {}, path: '' };

  Object.keys(coverage).forEach((path) => {
    let currentNode = root;
    let currentPath = root.path;
    const segments = path.split('/');
    segments.forEach((segment, index) => {
      currentPath = currentPath.length > 0 ? `${currentPath}/${segment}` : segment;
      if (!Object.hasOwnProperty.call(currentNode.children, segment)) {
        const isBranch = index < segments.length - 1;
        currentNode.children[segment] = {
          type: isBranch ? BRANCH_NODE : LEAF_NODE,
          name: segment,
          children: isBranch ? {} : undefined,
          path: currentPath
        };
      }

      currentNode = currentNode.children[segment];
    });
  });

  return root;
};