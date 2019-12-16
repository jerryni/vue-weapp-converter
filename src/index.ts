#! /usr/bin/env node

import fs from 'fs-extra';
import { parseVue } from './parse-vue';
import program from 'commander';

let filePath = null;

program
  .version('0.1.0')
  .arguments('<cmd>')
  .action(function (cmd) {
    filePath = cmd;
  });

program.parse(process.argv);

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