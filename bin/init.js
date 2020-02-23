#!/usr/bin/env node

const program = require('commander');
const shProcess = require('child_process');
const package = require('../package');
const { git } = require('../config/config');

program.version(package.version, '-v, --version')
  .command('init [name]')
  .action((name = './') => {
    console.log(`start cloning ${package.name}...`);
    shProcess.exec(`git clone ${git} ${name} && cd ${name} && git remote rm origin`, (err, stdout, stderr) => {
      if(err) {
        console.log(`exec error ${err}: ${stderr}.`);
        return;
      }

      console.log(`${stdout} cloned success.`)
    });
  });

program.parse(process.argv);