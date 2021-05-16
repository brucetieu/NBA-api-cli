const axios = require("axios");
const playerService = require("../services/player-services")

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

const getSeasonAvgPerPlayer = async (url, output) => {
  let queryString = "";

  for (let i = 0; i < output.length - 1; i++) {
    queryString += `player_ids[]=${output[i]}&`;
  }
  queryString += `season=${output[output.length - 1]}`;

  const response = await axios.get(url + "/season_averages?" + queryString);

  for (let resp of response.data.data) {
    let queriedPlayer = await playerService.savePlayerIdSearch(
      url + `/players/${resp.player_id}`
    );
    let full_name =
      queriedPlayer.data.first_name + " " + queriedPlayer.data.last_name;
    console.log({ full_name: full_name, ...resp });
  }
};

const getAxiosDataAndMetaData = async (nbaApiUrl) => {
  try {
    const response = await axios.get(nbaApiUrl);
    console.log(response.data.data);
    console.log(response.data.meta);
  } catch (e) {
    console.log({ message: e.message, name: e.name });
  }
};

const saveAxiosData = async (url) => {
  try {
    const axiosResp = await axios.get(url);
    return axiosResp;
  } catch (e) {
    console.log({ message: e.message, name: e.name });
  }
};

const logAxiosData = async (url) => {
  try {
    const axiosResp = await axios.get(url);
    console.log(axiosResp.data);
  } catch (e) {
    console.log({ message: e.message, name: e.name });
  }
};

module.exports = {
  getFilteredPlayersData,
  getSeasonAvgPerPlayer,
  getAxiosDataAndMetaData,
  saveAxiosData,
  logAxiosData,
};
