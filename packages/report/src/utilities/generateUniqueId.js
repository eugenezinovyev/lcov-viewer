import { nanoid } from 'nanoid';

/**
 * Generates unique id which is not present in the lines array.
 * If id is not unique, it will retry generating it up to retryLimit times.
 * If id is not unique after retryLimit retries, it will return false as second element of the array.
 * Uses nanoid to generate unique id, retry logic is implemented for ridiculously low chance of collision.
 * @param lines - array of lines of text.
 * @param retryLimit - how many times to retry generating unique id. Default is 3.
 * @returns {(string|boolean)[]} - array with unique id and boolean indicating if id was generated in less than retryLimit retries.
 */
function generateUniqueId(lines, retryLimit = 3) {
  let retries = 0;
  let id = nanoid();

  while (retries < retryLimit && lines.find(line => line.includes(id))) {
    id = nanoid();
    retries++;
  }

  // we need at least one dash to make it work with Prism
  // we also cannot have id end with dash

  return [`id-${id}-tag`, retries < retryLimit];
}

export default generateUniqueId;
