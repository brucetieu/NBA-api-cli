const players = require("../routes/player-routes");
const playerPrompts = require("../prompts/player-prompts");

const getAllPlayers = () => {
  playerPrompts.playerOptionPrompt().then(async (answer) => {
    await players.getAllPlayersRoute(answer);
  });
};

const getNumberOfPlayers = async () => {
  await players.getNumberOfPlayersRoute();
};

module.exports = {
  getNumberOfPlayers,
  getAllPlayers,
};
