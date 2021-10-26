import { source as parseLCOV } from 'lcov-parse';

const readLcov = (file) => new Promise((resolve, reject) => {
  const date = new Date(file.lastModified || file.lastModifiedDate || new Date().getTime()).toString();
  const reader = new FileReader();
  reader.onload = () => {
    const lcovContent = reader.result;
    parseLCOV(lcovContent, (error, data) => {
      if (error) {
        reject([error, 'Failed to parse file']);
      } else {
        resolve([date, data]);
      }
    });
  };
  reader.onerror = () => reject([reader.error, 'Failed to read file']);
  reader.readAsText(file);
});

export default readLcov;
