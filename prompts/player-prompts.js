const inquirer = require("inquirer");

const playerOptionPrompt = async () => {
  const prompt = inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "Select an option",
      choices: ["per_page (default = 25)", "page", "player_search"],
    },
  ]);
  return prompt;
};

const perPagePrompt = async () => {
  const prompt = inquirer.prompt([
    {
      type: "input",
      name: "perPageInput",
      message: "Enter the number of players you want to see per page",
    },
  ]);
  return prompt;
};

const pagePrompt = async () => {
  const prompt = inquirer.prompt([
    {
      type: "input",
      name: "pageInput",
      message: "Enter the page number for viewing players",
    },
  ]);
  return prompt;
};

const playerSearchPrompt = async () => {
  const prompt = inquirer.prompt([
    {
      type: "input",
      name: "playerInput",
      message: "Enter the first or last name of the player",
    },
  ]);
  return prompt;
};

module.exports = {
  playerOptionPrompt,
  perPagePrompt,
  pagePrompt,
  playerSearchPrompt,
};
