const nbaAPI = "https://www.balldontlie.io/api/v1";
const axios = require("axios");
const prompt = require("../prompts/prompts");
const playerService = require("../services/player-services")

const _filterTeamPageParams = async (input) => {
  if (input.perPageInput === "" && input.pageInput === "") {
    await teamService.getTeamsData(nbaAPI + "/teams");
  } else if (input.perPageInput !== "" && input.pageInput === "") {
    console.log(nbaAPI + `/players?page=${input.perPageInput}`);
    await teamService.getTeamsData(
      nbaAPI + `/teams?per_page=${input.perPageInput}`
    );
  } else if (input.perPageInput === "" && input.pageInput !== "") {
    await teamService.getTeamsData(nbaAPI + `/teams?page=${input.pageInput}`);
  } else if (input.perPageInput && input.pageInput) {
    await teamService.getTeamsData(
      nbaAPI + `/teams?per_page=${input.perPageInput}&page=${input.pageInput}`
    );
  }
};

const output =  []

const ask = (season) => {
  prompt.playerAvgPrompt().then(async input => {
    output.push(input.playerID)  
    if (input.askAgain) {
      ask(season);
    } else {
        output.push(season)
        console.log(output)
        let queryString = ''
        
        const playerNames = []

        for (let i = 0; i < output.length - 1; i++) {
            queryString += `player_ids[]=${output[i]}&`  
        }
        console.log(playerNames)
        queryString += `season=${output[output.length-1]}`
        
        const response = await axios.get(nbaAPI + "/season_averages?" + queryString)
        
        for (let resp of response.data.data) {
            let queriedPlayer = await playerService.playerIdSearch(nbaAPI + `/players/${resp.player_id}`)
            let full_name = queriedPlayer.data.first_name + ' ' + queriedPlayer.data.last_name
            console.log({full_name: full_name, ...resp})
            // playerNames.push(queriedPlayer.data.first_name + ' ' + queriedPlayer.data.last_name)
        }
        // console.log(response.data.data)
        // console.log({'full_name': playerNames[0], ...response.data.data[0]})
    }
  });
};

const seasonAveragesHandler = (answer) => {
  if (answer.options === "Get Season Averages") {
    prompt.seasonPrompt().then(choice => {
        ask(choice.season)
    })
  }
};

const getNumberOfTeamsRoute = async () => {
  const response = await axios.get(nbaAPI + "/teams");
  console.log(`Total number of players: ${response.data.meta.total_count}`);
};

module.exports = {
  seasonAveragesHandler,
  getNumberOfTeamsRoute,
};
