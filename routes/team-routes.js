const nbaAPI = "https://www.balldontlie.io/api/v1";
const axios = require("axios");
const pagePrompt = require("../prompts/page-prompts");
const teamService = require('../services/team-services');
const searchPrompt = require('../prompts/search-prompts')

const _filterTeamPageParams = async (input) => {
  if (input.perPageInput === '' && input.pageInput === '') {
    await teamService.getTeamsData(nbaAPI + "/teams")
  } else if (input.perPageInput !== '' && input.pageInput === '') {
    console.log(nbaAPI + `/players?page=${input.perPageInput}`)
    await teamService.getTeamsData(nbaAPI + `/teams?per_page=${input.perPageInput}`);
  } else if (input.perPageInput === '' && input.pageInput !== '') {
    await teamService.getTeamsData(nbaAPI + `/teams?page=${input.pageInput}`);
  } else if (input.perPageInput && input.pageInput) {
    await teamService.getTeamsData(nbaAPI + `/teams?per_page=${input.perPageInput}&page=${input.pageInput}`)
  }
}

const teamsHandler = (answer) => {
  if (answer.options === "Get All Teams") {
    pagePrompt.pagePrompts().then(async (input) => {
      await _filterTeamPageParams(input)
    })
  } else {
    searchPrompt.searchByTeamIDPrompt().then(async input => {
      await teamService.teamIdSearch(nbaAPI + `/teams/${input.teamIDInput}`)
    })
  }
}


const getNumberOfTeamsRoute = async () => {
  const response = await axios.get(nbaAPI + "/teams");
  console.log(`Total number of players: ${response.data.meta.total_count}`);
};

module.exports = {
  teamsHandler,
  getNumberOfTeamsRoute,
};
