const nbaAPI = "https://www.balldontlie.io/api/v1";
const axios = require("axios");
const teamUtils = require('../utils/team-utils')


const teamsHandler = async (answer) => {
  if (answer.options.includes("per_page")) {
    teamUtils.perPageTeams(nbaAPI + "/teams?per_page=")
  } else if (answer.options === "page") {
    teamUtils.pageTeams(nbaAPI + "/teams?page=")
  } else {
    teamUtils.teamIdSearch(nbaAPI + "/teams/")
  }
};

const getNumberOfTeamsRoute = async () => {
  const response = await axios.get(nbaAPI + "/teams");
  console.log(`Total number of players: ${response.data.meta.total_count}`);
};

module.exports = {
  teamsHandler,
  getNumberOfTeamsRoute,
};
