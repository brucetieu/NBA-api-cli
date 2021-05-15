const nbaAPI = "https://www.balldontlie.io/api/v1";
const axios = require("axios");
const playerService = require("../services/player-services");
const prompt = require("../prompts/prompts");

const _filterPageParams = async (input) => {
    if (input.perPageInput === '' && input.pageInput === '') {
      await playerService.getFilteredPlayersData(nbaAPI + "/players")
    } else if (input.perPageInput !== '' && input.pageInput === '') {
      console.log(nbaAPI + `/players?page=${input.perPageInput}`)
      await playerService.getFilteredPlayersData(nbaAPI + `/players?per_page=${input.perPageInput}`);
    } else if (input.perPageInput === '' && input.pageInput !== '') {
      await playerService.getFilteredPlayersData(nbaAPI + `/players?page=${input.pageInput}`);
    } else if (input.perPageInput && input.pageInput) {
      await playerService.getFilteredPlayersData(nbaAPI + `/players?per_page=${input.perPageInput}&page=${input.pageInput}`)
    }
}

const _filterPlayerParams = async (input) => {
  if (input.playerSearchOptions === 'search by first or last name') {
    prompt.playerSearchPrompt().then( async (data) => {
      await playerService.getFilteredPlayersData(nbaAPI + `/players?search=${data.playerInput}`)
    })
  } else {
    prompt.searchByPlayerIDPrompt().then( async (data) => {
      await playerService.logPlayerIdSearch(nbaAPI + `/players/${data.playerIDInput}`)
    })
  }
}

const playersHandler = (answer) => {
  if (answer.options === "Get All Players") {
    prompt.pagePrompts().then(async (input) => {
      await _filterPageParams(input)
    })
  } else {
    prompt.specificPlayerPrompt().then(async input => {
      await _filterPlayerParams(input)
    })
  }
}

const getNumberOfPlayersRoute = async () => {
  const response = await axios.get(nbaAPI + "/players");
  console.log(`Total number of players: ${response.data.meta.total_count}`);
};

module.exports = {
  playersHandler,
  getNumberOfPlayersRoute,
};
