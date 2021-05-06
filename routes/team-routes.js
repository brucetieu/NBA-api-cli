const nbaAPI = "https://www.balldontlie.io/api/v1";
const axios = require("axios");
const pagePrompts = require("../prompts/page-prompts");
const searchPrompts = require("../prompts/search-prompts");

const axiosGet = async (nbaApiUrl) => {
  const response = await axios.get(nbaApiUrl);
  console.log(response.data.data)
  console.log(response.data.meta)
};


const teamsHandler = async (answer) => {
    let nbaApiUrl;
    if (answer.options.includes("per_page")) {
      nbaApiUrl = nbaAPI + "/teams?per_page=";
      pagePrompts
        .perPagePrompt()
        .then(
          async (input) =>
            await axiosGet(nbaApiUrl + input.perPageInput.toString())
        );
    } else if (answer.options === "page") {
      nbaApiUrl = nbaAPI + "/teams?page=";
      pagePrompts
        .pagePrompt()
        .then(
          async (input) => await axiosGet(nbaApiUrl + input.pageInput.toString())
        );
    }
    else {
      nbaApiUrl = nbaAPI + "/teams/";
      searchPrompts.searchByTeamIDPrompt().then(async (input) => {
        const axiosResp = await axios.get(nbaApiUrl + input.teamIDInput)
        console.log(axiosResp.data)
      })
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
  
