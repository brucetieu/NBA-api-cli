const teams = require("../routes/team-routes");
const prompt = require("../prompts/prompts");

const getAllTeams = () => {
  prompt.teamOptionPrompt().then(async (answer) => {
    await teams.teamsHandler(answer);
  });
};

const getNumberOfTeams = async () => {
  await teams.getNumberOfTeamsRoute();
};

module.exports = {
  getAllTeams,
  getNumberOfTeams,
};
