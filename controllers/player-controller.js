const players = require("../routes/player-routes");
const prompt = require("../prompts/prompts");

const getAllPlayers = () => {
  prompt.playerOptionPrompt().then(async (answer) => {
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
