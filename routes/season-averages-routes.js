const nbaAPI = "https://www.balldontlie.io/api/v1";
const axios = require("axios");
const prompt = require("../prompts/prompts");
const seasonAvgService = require("../services/season-averages-services");

const output = [];

const ask = (season) => {
  prompt.playerAvgPrompt().then(async (input) => {
    output.push(input.playerID);
    if (input.askAgain) {
      ask(season);
    } else {
      output.push(season);
      await seasonAvgService.getSeasonAvgPerPlayer(nbaAPI, output);
    }
  });
};

const seasonAveragesHandler = (answer) => {
  if (answer.options === "Get Season Averages") {
    prompt.seasonPrompt().then((choice) => {
      ask(choice.season);
    });
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
