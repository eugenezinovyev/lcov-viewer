import { source } from 'lcov-parse';

const parseLCOV = content => new Promise((resolve, reject) => {
  source(content, (error, data) => {
    if (error) {
      reject(error);
    } else {
      resolve(data);
    }
  });
});

export default parseLCOV;
