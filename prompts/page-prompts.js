const inquirer = require("inquirer");

const perPagePrompt = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "perPageInput",
      message: "Enter the number of results you want to see per page",
    },
  ]);
};

const pagePrompt = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "pageInput",
      message: "Enter the page number to view",
    },
  ]);
};


module.exports = {
  perPagePrompt,
  pagePrompt,
};
