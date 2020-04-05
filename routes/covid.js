const express = require("express");
const router = express.Router();
const covid = require("../utils/covid-tracker");

// Get Home page of COVID-tacker
router.get("/", async (req, res, next) => {
  try {
    const payload = {
      title: "COVID-19 Tracker",
    };
    const allCovidData = await covid.getAllData();
    if (allCovidData.statewise.length > 0) {
      let allSateData = allCovidData.statewise;
      payload.active = allSateData[0].active;
      payload.confirmed = allSateData[0].confirmed;
      payload.recovered = allSateData[0].recovered;
      payload.deaths = allSateData[0].deaths;
      payload.lastupdatedtime = allSateData[0].lastupdatedtime;

      // Now remove all India entry from the array
      allSateData.splice(0, 1);
      payload.allStatesData = allSateData;

      // Now render the COVID home page
      res.render("covid-all", {
        payload: payload,
      });
    } else {
      let err = new Error("No Data Found");
      next(err);
    }
  } catch (error) {
    let err = new Error("No Data Found");
    next(err);
  }
});

// Get district data page of COVID-tacker
router.get("/state/:stateName", async (req, res, next) => {
  try {
    let stateName = req.params.stateName;
    const payload = {
      title: "COVID-19 Tracker",
    };
    const allCovidData = await covid.getAllData();

    if (allCovidData.statewise.length > 0) {
      let allSateData = allCovidData.statewise;
      let isStateFound = false;
      for (let index = 0; index < allSateData.length; index++) {
        const element = allSateData[index];
        if (element.state.toUpperCase() === stateName.toUpperCase()) {
          isStateFound = true;
          payload.state = element.state;
          payload.active = element.active;
          payload.confirmed = element.confirmed;
          payload.recovered = element.recovered;
          payload.deaths = element.deaths;
          payload.lastupdatedtime = element.lastupdatedtime;
          break;
        }
      }
      if (isStateFound) {
        // Now get the district Data of that state.
        payload.alldistrictsData = [];
        const allDistrictData = await covid.getStateData();
        for (let index = 0; index < allDistrictData.length; index++) {
          const element = allDistrictData[index];
          if (element.state.toUpperCase() === stateName.toUpperCase()) {
            payload.alldistrictsData = element.districtData;
            break;
          }
        }
        if (payload.alldistrictsData.length === 0) {
          payload.alldistrictsData.push({
            district: "Not available",
            confirmed: 0,
          });
        }
        // Now render the COVID state's district home page
        res.render("covid-state", {
          payload: payload,
        });
      } else {
        res.redirect("/covid");
      }
    } else {
      let err = new Error("No Data Found in else");
      next(err);
    }
  } catch (error) {
    let err = new Error("No Data Found in catch, details are: " + error);
    console.log(err);
    next(err);
  }
});

module.exports = router;