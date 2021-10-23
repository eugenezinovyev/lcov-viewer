import { source as parseLCOV } from 'lcov-parse';

const readLcov = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    const lcovContent = reader.result;
    parseLCOV(lcovContent, (error, data) => {
      if (error) {
        reject([error, 'Failed to parse file']);
      } else {
        resolve(data);
      }
    });
  };
  reader.onerror = () => reject([reader.error, 'Failed to read file']);
  reader.readAsText(file);
});

export default readLcov;
