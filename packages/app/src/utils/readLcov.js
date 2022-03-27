import { parseLCOV } from '@lcov-viewer/core';

const readLcov = (file) => new Promise((resolve, reject) => {
  const date = new Date(file.lastModified || file.lastModifiedDate || new Date().getTime()).toString();
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const data = await parseLCOV(reader.result);
      resolve([date, data]);
    } catch (error) {
      reject([error, 'Failed to parse file']);
    }
  };
  reader.onerror = () => reject([reader.error, 'Failed to read file']);
  reader.readAsText(file);
});

export default readLcov;
