const axios = require("axios");
const searchPrompts = require('../prompts/search-prompts')

const getFilteredPlayersData = async (nbaApiUrl) => {
  try {
    const response = await axios.get(nbaApiUrl);
    const newData = [];
    response.data.data.forEach((player) => {
      const filteredResponse = {};
      filteredResponse["id"] = player["id"];
      filteredResponse["position"] = player["position"];
      filteredResponse["full_name"] =
        player["first_name"] + " " + player["last_name"];
      filteredResponse["height"] =
        player["height_feet"] + " ft " + player["height_inches"] + " in";
      filteredResponse["team"] = player["team"]["full_name"];
      newData.push(filteredResponse);
    });
    newData.push(response.data.meta);
    console.log(newData);
  } catch (e) {
    console.log({ message: e.message, name: e.name });
  }
};

const perPagePlayers = (url) => {
  pagePrompts
    .perPagePrompt()
    .then(async (input) => await getFilteredPlayersData(url + input.perPageInput.toString()));
};

const pagePlayers = (url) => {
  pagePrompts
    .pagePrompt()
    .then(async (input) => await getFilteredPlayersData(url + input.pageInput.toString()));
};

const playerSearch = (url) => {
  searchPrompts.playerSearchPrompt().then(async (input) => {
    await getFilteredPlayersData(url + input.playerInput);
  });
};

const playerIdSearch = (url) => {
  searchPrompts.searchByPlayerIDPrompt().then(async (input) => {
    try {
      const axiosResp = await axios.get(url + input.playerIDInput);
      console.log(axiosResp.data);
    } catch (e) {
      console.log({ message: e.message, name: e.name });
    }
  });
};

module.exports = {
  perPagePlayers,
  pagePlayers,
  getFilteredPlayersData,
  playerSearch,
  playerIdSearch
}