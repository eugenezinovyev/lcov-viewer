import unix_relative_multi_root from './unix_relative_multi_root.info';
import unix_relative_single_root from './unix_relative_single_root.info';
import unix_absolute from './unix_absolute.info';
import win_relative_multi_root from './win_relative_multi_root.info';
import win_relative_single_root from './win_relative_single_root.info';
import win_absolute from './win_absolute.info';

const mocks = {
  unixRelativeMultiRoot: unix_relative_multi_root,
  unixRelativeSingleRoot: unix_relative_single_root,
  unixAbsolute: unix_absolute,
  winRelativeMultiRoot: win_relative_multi_root,
  winRelativeSingleRoot: win_relative_single_root,
  winAbsolute: win_absolute,
};

export default mocks;
