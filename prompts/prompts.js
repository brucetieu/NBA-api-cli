const inquirer = require("inquirer");

const playerOptionPrompt = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "Select an option",
      choices: ["Get All Players", "Get a Specific Player"],
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

const seasonAveragesOptionPrompt = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "Select an option",
      choices: ["Get Season Averages"],
    },
  ]);
};

const pagePrompts = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "perPageInput",
      message:
        "Enter the number of results you want to see per page (max 100, can be left blank)",
    },
    {
      type: "input",
      name: "pageInput",
      message: "Enter the page number to view (can be left blank)",
    },
  ]);
};

const specificPlayerPrompt = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "playerSearchOptions",
      message: "Select an option",
      choices: ["search by first or last name", "search by id"],
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

const seasonPrompt = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "season",
      message: "Enter a season (year)",
    },
  ]);
};

const statsQueryParams = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "playerID",
      message: "Enter a player ID",
    },
    {
      type: "confirm",
      name: "askAgain",
      message: "Want to enter another player ID (just hit enter for YES)?",
      default: true,
    },
  ]);
};

module.exports = {
  playerOptionPrompt,
  teamOptionPrompt,
  seasonAveragesOptionPrompt,
  pagePrompts,
  specificPlayerPrompt,
  playerSearchPrompt,
  searchByPlayerIDPrompt,
  searchByTeamIDPrompt,
  seasonPrompt,
  statsQueryParams
};
