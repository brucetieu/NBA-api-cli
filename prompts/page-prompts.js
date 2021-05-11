const inquirer = require("inquirer");

const pagePrompts = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "perPageInput",
      message: "Enter the number of results you want to see per page (max 100, can be left blank)",
    },
    {
      type: "input",
      name: "pageInput",
      message: "Enter the page number to view (can be left blank)",
    },
  ]);
};

module.exports = {
  pagePrompts,
};
