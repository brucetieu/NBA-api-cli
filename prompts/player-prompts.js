const inquirer = require("inquirer");

const playerOptionPrompt = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "Select an option",
      choices: ["per_page (default = 25)", "page", "player_search"],
    },
  ]);
};

const perPagePrompt = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "perPageInput",
      message: "Enter the number of players you want to see per page",
    },
  ]);
};

const pagePrompt = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "pageInput",
      message: "Enter the page number for viewing players",
    },
  ]);
};

const playerSearchPrompt = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "playerInput",
      message: "Enter the first or last name of the player",
    },
  ]);
};

module.exports = {
  playerOptionPrompt,
  perPagePrompt,
  pagePrompt,
  playerSearchPrompt,
};
