#!/usr/bin/env node
import { build } from '@/build';
import { message } from '@/console';
import { watch } from '@/watch';
import * as yargs from 'yargs';
import { initConfig } from './config';
process.on('SIGINT', function() {
  message('Exiting...', 'redBright');
  process.exit();
});

const args = yargs
  .usage(
    `
Purple haze 🤯
GraphQL Static Site Generator
Run: purplehaze to watch current folder for compatible files
`,
  )
  .option('init', {
    alias: 'i',
    describe: 'Init Purple haze config',
    boolean: true,
  })
  .option('build', {
    alias: 'b',
    describe: 'Build project',
    boolean: true,
  })
  .demandCommand(0).argv;

if (args.build) {
  build();
} else if (args.init) {
  initConfig();
} else {
  watch();
}
