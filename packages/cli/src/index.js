#! /usr/bin/env node

import { program } from 'commander';
import lcov from '../commands/lcov';

program
  .name('lcov-viewer')
  .command('lcov <src>')
  .description('Converts lcov.info file into an LCOV viewer HTML report.')
  .option('-o, --output <output>', 'The output directory.', './lcov-viewer')
  .action(lcov);

program.parse();
