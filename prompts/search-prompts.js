const inquirer = require("inquirer");

const specificPlayerPrompt = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "playerSearchOptions",
      message: "Select an option",
      choices: ["search by first or last name", "search by id"],
    },
  ])
}

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
  searchByTeamIDPrompt,
  specificPlayerPrompt
};
