const axios = require("axios");

const getTeamsData = async (nbaApiUrl) => {
  try {
    const response = await axios.get(nbaApiUrl);
    console.log(response.data.data);
    console.log(response.data.meta);
  } catch (e) {
    console.log({ message: e.message, name: e.name });
  }
};


const teamIdSearch = async (url) => {
    try {
      const axiosResp = await axios.get(url);
      console.log(axiosResp.data);
    } catch (e) {
      console.log({ message: e.message, name: e.name });
    }
};

module.exports = {
  getTeamsData,
  teamIdSearch,
};
