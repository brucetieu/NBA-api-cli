const nbaAPI = "https://www.balldontlie.io/api/v1";
const axios = require("axios");
const playerPrompts = require("../prompts/player-prompts");

const axiosGet = async (nbaApiUrl) => {
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
};

const getAllPlayersRoute = async (answer) => {
  let nbaApiUrl;
  if (answer.options.includes("per_page")) {
    nbaApiUrl = nbaAPI + "/players?per_page=";
    playerPrompts
      .perPagePrompt()
      .then(
        async (input) =>
          await axiosGet(nbaApiUrl + input.perPageInput.toString())
      );
  } else if (answer.options === "page") {
    nbaApiUrl = nbaAPI + "/players?page=";
    playerPrompts
      .pagePrompt()
      .then(
        async (input) => await axiosGet(nbaApiUrl + input.pageInput.toString())
      );
  } else {
    nbaApiUrl = nbaAPI + "/players?search=";
    playerPrompts.playerSearchPrompt().then(async (input) => {
      await axiosGet(nbaApiUrl + input.playerInput);
    });
  }
};

const getNumberOfPlayersRoute = async () => {
  const response = await axios.get(nbaAPI + "/players");
  console.log(`Total number of players: ${response.data.meta.total_count}`);
};

module.exports = {
  getAllPlayersRoute,
  getNumberOfPlayersRoute,
};
