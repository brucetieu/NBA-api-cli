const axios = require("axios");
const searchPrompts = require("../prompts/search-prompts");
const pagePrompts = require("../prompts/page-prompts");

const getTeamsData = async (nbaApiUrl) => {
  try {
    const response = await axios.get(nbaApiUrl);
    console.log(response.data.data);
    console.log(response.data.meta);
  } catch (e) {
    console.log({ message: e.message, name: e.name });
  }
};

const perPageTeams = (url) => {
  pagePrompts
    .perPagePrompt()
    .then(
      async (input) => await getTeamsData(url + input.perPageInput.toString())
    );
};

const pageTeams = (url) => {
  pagePrompts
    .pagePrompt()
    .then(
      async (input) => await getTeamsData(url + input.pageInput.toString())
    );
};

const teamIdSearch = (url) => {
  searchPrompts.searchByTeamIDPrompt().then(async (input) => {
    try {
      const axiosResp = await axios.get(url + input.teamIDInput);
      console.log(axiosResp.data);
    } catch (e) {
      console.log({ message: e.message, name: e.name });
    }
  });
};

module.exports = {
  perPageTeams,
  pageTeams,
  getTeamsData,
  teamIdSearch,
};
