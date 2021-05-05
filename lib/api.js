const nbaAPI = "https://www.balldontlie.io/api/v1";
const inquirer = require('inquirer')
const axios = require("axios");

const getAllPlayers = async () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'page_option',
      message: 'Select a page option',
      choices: ['per_page (default = 25)', 'page']
    },
    {
      type: 'input',
      name: 'page_input',
      message: 'Enter the number of players you want to see per page or a page number',
    }
  ]).then(async (res) => {
    let nbaApiUrl
    if (res['page_option'].includes('per_page')) nbaApiUrl = nbaAPI + '/players?per_page=' + res['page_input'].toString()
    else nbaApiUrl = nbaAPI + '/players?page=' + res['page_input'].toString()
    const response = await axios.get(nbaApiUrl);
    const newData = [];
    response.data.data.forEach((player) => {
      const filteredResponse = {};
      filteredResponse["id"] = player["id"];
      filteredResponse["position"] = player["position"];
      filteredResponse["full_name"] = player["first_name"] + " " + player["last_name"];
      filteredResponse["height"] = player["height_feet"] + " ft " + player["height_inches"] + " in";
      filteredResponse["team"] = player["team"]["full_name"];
      newData.push(filteredResponse);
    });
    newData.push(response.data.meta);
    console.log(newData);
  })
};

const getNumberOfPlayers = async () => {
  const response = await axios.get(nbaAPI + "/players");
  console.log(`Total number of players: ${response.data.meta.total_count}`);
};

module.exports = {
  getNumberOfPlayers,
  getAllPlayers
};
