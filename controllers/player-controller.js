const players = require("../routes/player-routes");
const optionsPrompts = require("../prompts/options-prompts");

const getAllPlayers = () => {
  optionsPrompts.playerOptionPrompt().then(async (answer) => {
    await players.playersHandler(answer);
  });
};

const getNumberOfPlayers = async () => {
  await players.getNumberOfPlayersRoute();
};

module.exports = {
  getNumberOfPlayers,
  getAllPlayers,
};
