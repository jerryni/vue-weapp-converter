#! /usr/bin/env node

import program from 'commander';
import { parseVue } from './parse-vue';
import { parseWeapp } from './parse-weapp';
import { checkFilePath } from './utils/file';

let filePath = '';

program
  .version('0.5.3')
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

  checkFilePath(filePath).then(() => {
    parseVue(filePath);
  })
}
