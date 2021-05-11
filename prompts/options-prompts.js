const inquirer = require("inquirer");

const playerOptionPrompt = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "Select an option",
      choices: [
        "Get All Players",
        "Get a Specific Player"
      ],
    },
  ]);
};

const teamOptionPrompt = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "Select an option",
      choices: ["per_page (default = 25)", "page", "search team by id"],
    },
  ]);
};

module.exports = {
  playerOptionPrompt,
  teamOptionPrompt,
};
