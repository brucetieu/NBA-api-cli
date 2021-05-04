#!/usr/bin/env node

const program = require('commander');
const api = require('../lib/api')

program
  .version('0.0.1')
  .option('-n, --total-players', 'Get total number of NBA players', api.getNumberOfPlayers)
  .option('-lp, --list-players', 'List first 25 NBA Players', api.getAllPlayers)


// must be before .parse() since
// node's emit() is immediate

program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ custom-help --help');
  console.log('    $ custom-help -h');
  console.log('');
});

program.parse(process.argv);
