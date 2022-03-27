const { promises: fs } = require('fs');
const path = require('path');

module.exports = ({ files: maybeFilesPromise, dest }) => ({
  name: 'copy',
  async buildEnd() {
    await fs.mkdir(dest, { recursive: true });
    const files = await Promise.resolve(maybeFilesPromise);
    await Promise.all(files.map(file => fs.copyFile(file, path.resolve(dest, path.basename(file)))));
  },
});
