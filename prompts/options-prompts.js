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
      choices: ["Get All Teams", "Get a Specific Team"],
    },
  ]);
};

module.exports = {
  playerOptionPrompt,
  teamOptionPrompt,
};
