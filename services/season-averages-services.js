const playerService = require("../services/player-services");
const axios = require("axios");

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

module.exports = {
  getSeasonAvgPerPlayer,
};
