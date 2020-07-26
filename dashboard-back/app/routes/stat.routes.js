module.exports = function(app) {
  const click = require("../controllers/stat.controller.js");

  let router = require("express").Router();

  // add a new click to db
  router.post("/newclick", click.newClick);

  router.get("/scanclickpermonth", click.scanClickPerMonth);

  router.get("/attackclickpermonth", click.attackClickPerMonth);

  app.use('/api/stat', router);

};
