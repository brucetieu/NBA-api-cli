const nbaAPI = "https://www.balldontlie.io/api/v1";
const inquirer = require('inquirer')
const axios = require("axios");

const perPageResponse = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'perPageInput',
      message: 'Enter the number of players you want to see per page'
    }
  ]).then(async answer => {
    const nbaApiUrl = nbaAPI + '/players?per_page=' + answer.perPageInput.toString()
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
  }).catch(err => {
    console.log({status: err.response.status, statusText: err.response.statusText})
  })
}

const pageResponse = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'perPageInput',
        message: 'Enter the page number for viewing players'
      }
    ]).then(async answer => {
      const nbaApiUrl = nbaAPI + '/players?page=' + answer.perPageInput.toString()
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
    }).catch(err => {
      console.log({status: err.response.status, statusText: err.response.statusText})
    })
}

const playerSearchResponse = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'playerInput',
      message: 'Enter the first or last name of the player'
    }
  ]).then(async answer => {
    const nbaApiUrl = nbaAPI + '/players?search=' + answer.playerInput
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
  }).catch(err => {
    console.log({status: err.response.status, statusText: err.response.statusText})
  })
}

const getAllPlayers = async () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'options',
      message: 'Select an option',
      choices: ['per_page (default = 25)', 'page', 'player_search']
    },
  ]).then(async (answer) => {
    if (answer.options.includes('per_page')) {
      perPageResponse()
    } else if (answer.options === 'page') {
      pageResponse()
    } else playerSearchResponse()
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
