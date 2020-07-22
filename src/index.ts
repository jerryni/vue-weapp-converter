#! /usr/bin/env node

import fs from 'fs-extra';
import program from 'commander';
import { parseVue } from './parse-vue';
import { parseWeapp } from './parse-weapp';
import { checkFilePath } from './utils/file';

let filePath = null;

program
  .version('0.4.1')
  .arguments('<cmd>')
  .option('-r, --reverse <path>', 'weapp to vue')
  .action(function (cmd) {
    filePath = cmd;
  });

program.parse(process.argv);

if (program.reverse) {
  console.log('program.reverse', program.reverse)
  const path = program.reverse;

  checkFilePath(path).then(() => {
    parseWeapp(path);
  });
} else {
  if (filePath === null) {
    console.error('No input file specified');
    process.exit(1);
  }

  try {
    if (fs.existsSync(filePath)) {
      console.log('your file:', filePath)
      parseVue(filePath);
    } else {
      console.log('file doesn\'t exist');
      process.exit(1);
    }

  } catch(err) {
    console.error(err)
    process.exit(1);
  }
}
