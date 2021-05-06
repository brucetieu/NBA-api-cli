const teams = require("../routes/team-routes");
const optionsPrompts = require("../prompts/options-prompts");

const getAllTeams = () => {
  optionsPrompts.teamOptionPrompt().then(async (answer) => {
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
