const nbaAPI = "https://www.balldontlie.io/api/v1";
const axios = require("axios");
const prompt = require("../prompts/prompts");

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

const ask = () => {
  prompt.statsQueryParams().then(async (input) => {
    if (input.askAgain) {
      ask();
    }
  });
};
const seasonAveragesHandler = (answer) => {
  if (answer.options === "Get Season Averages") {
    prompt.mainPrompt().then(choice => {
        prompt.statsQueryParams().then((input) => {
            ask();
        })
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
