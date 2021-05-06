#!/usr/bin/env node

const program = require('commander');
const playerController = require('../controllers/player-controller')
const teamController = require('../controllers/team-controller')

program
  .version('0.0.1')
  .option('-np, --total-players', 'Get total number of NBA players', playerController.getNumberOfPlayers)
  .option('-lp, --list-players', 'List NBA Players', playerController.getAllPlayers)
  .option('-nt, --total-teams', 'Get total number of NBA teams', teamController.getNumberOfTeams)
  .option('-lt, --list-teams', 'List NBA teams', teamController.getAllTeams)


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
