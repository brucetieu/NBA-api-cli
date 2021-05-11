const axios = require("axios");

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

const playerIdSearch = async (url) => {
    try {
      const axiosResp = await axios.get(url);
      console.log(axiosResp.data);
    } catch (e) {
      console.log({ message: e.message, name: e.name });
    }
};

module.exports = {
  getFilteredPlayersData,
  playerIdSearch,
};
