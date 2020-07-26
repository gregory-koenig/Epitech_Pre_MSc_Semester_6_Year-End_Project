const { authJwt } = require("../middlewares");
const controller = require("../controllers/attack.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/attack", controller.attack);

  app.get("/api/attack/report", controller.getDoc);

};
