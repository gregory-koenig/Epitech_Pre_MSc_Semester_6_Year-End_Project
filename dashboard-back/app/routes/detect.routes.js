const { authJwt } = require("../middlewares");
const controller = require("../controllers/detect.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/detect/scan", controller.scan);

  app.get("/api/detect/scan/report", controller.getDoc);

};
