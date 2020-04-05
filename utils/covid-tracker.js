const axios = require("axios");

exports.getAllData = async () => {
  try {
    const allData = await axios.get("https://api.covid19india.org/data.json");
    // console.log(JSON.stringify(allData.data.statewise, null, 2));
    return allData.data;
  } catch (error) {
    console.log(`Error from get all data call, details are: ${error}`);
    throw error;
  }
};

exports.getStateData = async () => {
  try {
    const allDistrict = await axios.get("https://api.covid19india.org/v2/state_district_wise.json");
    // console.log(JSON.stringify(allDistrict.data, null, 2));
    return allDistrict.data;
  } catch (error) {
    console.log(`Error from get all district data call, details are: ${error}`);
    throw error;
  }
};