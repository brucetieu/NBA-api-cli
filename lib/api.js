const nbaAPI = "https://www.balldontlie.io/api/v1";
const axios = require("axios");

const getPlayers = async () => {
  const response = await axios.get(nbaAPI + "/players");
  console.log(response.data.data)
  const newData = []
  response.data.data.forEach(player => {
    const filteredResponse = {}
    filteredResponse['id'] = player['id']
    filteredResponse['position'] = player['position']
    filteredResponse['full_name'] = player['first_name'] + ' ' + player['last_name']
    filteredResponse['height'] = player['height_feet'] + ' ft ' + player['height_inches'] + ' in'
    filteredResponse['team'] = player['team']['full_name'] 
    newData.push(filteredResponse)
  })
  newData.push(response.data.meta)
  console.log(newData)
};

const getNumberOfPlayers = async () => {
  const response = await axios.get(nbaAPI + "/players");
  console.log(`Total number of players: ${response.data.meta.total_count}`)
}

module.exports = {
  getPlayers, getNumberOfPlayers
};
