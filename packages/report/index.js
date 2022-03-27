const path = require('path');
const fs = require('fs');

module.exports = {
  async getAssets() {
    const dist = path.resolve(__dirname, './dist');
    const files = await fs.promises.readdir(dist);

    return files.map(file => path.resolve(dist, file));
  },
};
