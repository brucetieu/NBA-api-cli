const inquirer = require("inquirer");

const playerSearchPrompt = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "playerInput",
      message: "Enter the first or last name of the player",
    },
  ]);
};

const searchByPlayerIDPrompt = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "playerIDInput",
      message: "Enter the id of the player",
    },
  ]);
};

const searchByTeamIDPrompt = () => {
    return inquirer.prompt([
      {
        type: "input",
        name: "teamIDInput",
        message: "Enter the id of the team",
      },
    ]);
  };
  
module.exports = {
  playerSearchPrompt,
  searchByPlayerIDPrompt,
  searchByTeamIDPrompt
};
