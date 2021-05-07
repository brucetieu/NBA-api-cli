const nbaAPI = "https://www.balldontlie.io/api/v1";
const axios = require("axios");
const playerUtils = require("../utils/players-utils");

const playersHandler = async (answer) => {
  if (answer.options.includes("per_page")) {
    playerUtils.perPagePlayers(nbaAPI + "/players?per_page=");
  } else if (answer.options === "page") {
    playerUtils.pagePlayers(nbaAPI + "/players?page=");
  } else if (answer.options === "player_search") {
    playerUtils.playerSearch(nbaAPI + "/players?search=");
  } else {
    playerUtils.playerIdSearch(nbaAPI + "/players/");
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
