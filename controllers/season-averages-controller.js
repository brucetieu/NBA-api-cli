const seasonAverage = require("../routes/season-averages-routes");
const prompt = require("../prompts/prompts");

const getAverages = () => {
  prompt.seasonAveragesOptionPrompt().then(async (answer) => {
    await seasonAverage.seasonAveragesHandler(answer)
  });
};


module.exports = {
  getAverages,
};
