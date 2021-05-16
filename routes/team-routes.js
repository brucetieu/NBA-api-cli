const nbaAPI = "https://www.balldontlie.io/api/v1";
const axios = require("axios");
const prompt = require("../prompts/prompts");
const service = require("../services/services")

const _filterTeamPageParams = async (input) => {
  if (input.perPageInput === '' && input.pageInput === '') {
    await service.getAxiosDataAndMetaData(nbaAPI + "/teams")
  } else if (input.perPageInput !== '' && input.pageInput === '') {
    console.log(nbaAPI + `/players?page=${input.perPageInput}`)
    await service.getAxiosDataAndMetaData(nbaAPI + `/teams?per_page=${input.perPageInput}`);
  } else if (input.perPageInput === '' && input.pageInput !== '') {
    await service.getAxiosDataAndMetaData(nbaAPI + `/teams?page=${input.pageInput}`);
  } else if (input.perPageInput && input.pageInput) {
    await service.getAxiosDataAndMetaData(nbaAPI + `/teams?per_page=${input.perPageInput}&page=${input.pageInput}`)
  }
}

const teamsHandler = (answer) => {
  if (answer.options === "Get All Teams") {
    prompt.pagePrompts().then(async (input) => {
      await _filterTeamPageParams(input)
    })
  } else {
    prompt.searchByTeamIDPrompt().then(async input => {
      await service.logAxiosData(nbaAPI + `/teams/${input.teamIDInput}`)
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
