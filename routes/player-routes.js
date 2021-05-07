const nbaAPI = "https://www.balldontlie.io/api/v1";
const axios = require("axios");
const { response } = require("express");
const pagePrompts = require("../prompts/page-prompts");
const searchPrompts = require("../prompts/search-prompts");

const axiosGet = async (nbaApiUrl) => {
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

const playersHandler = async (answer) => {
  let nbaApiUrl;
  if (answer.options.includes("per_page")) {
    nbaApiUrl = nbaAPI + "/players?per_page=";
    pagePrompts
      .perPagePrompt()
      .then(
        async (input) =>
          await axiosGet(nbaApiUrl + input.perPageInput.toString())
      );
  } else if (answer.options === "page") {
    nbaApiUrl = nbaAPI + "/players?page=";
    pagePrompts
      .pagePrompt()
      .then(
        async (input) => await axiosGet(nbaApiUrl + input.pageInput.toString())
      );
  } else if (answer.options === "player_search") {
    nbaApiUrl = nbaAPI + "/players?search=";
    searchPrompts.playerSearchPrompt().then(async (input) => {
      await axiosGet(nbaApiUrl + input.playerInput);
    });
  } else {
    nbaApiUrl = nbaAPI + "/players/";
    searchPrompts.searchByPlayerIDPrompt().then(async (input) => {
      try {
        const axiosResp = await axios.get(nbaApiUrl + input.playerIDInput);
        console.log(axiosResp.data);
      } catch (e) {
        console.log({ message: e.message, name: e.name });
      }
    });
  }
};

const getNumberOfPlayersRoute = async () => {
  const response = await axios.get(nbaAPI + "/players");
  console.log(`Total number of players: ${response.data.meta.total_count}`);
};

module.exports = {
  playersHandler,
  getNumberOfPlayersRoute,
};
