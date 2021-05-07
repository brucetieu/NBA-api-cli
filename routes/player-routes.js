const nbaAPI = "https://www.balldontlie.io/api/v1";
const axios = require("axios");
const playerService = require("../services/player-services");

const playersHandler = async (answer) => {
  if (answer.options.includes("per_page")) {
    playerService.perPagePlayers(nbaAPI + "/players?per_page=");
  } else if (answer.options === "page") {
    playerService.pagePlayers(nbaAPI + "/players?page=");
  } else if (answer.options === "player_search") {
    playerService.playerSearch(nbaAPI + "/players?search=");
  } else {
    playerService.playerIdSearch(nbaAPI + "/players/");
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
