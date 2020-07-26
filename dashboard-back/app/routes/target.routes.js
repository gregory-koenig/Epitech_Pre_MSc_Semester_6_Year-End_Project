const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  const target = require("../controllers/target.controller.js");

  let router = require("express").Router();

  // Create a new Target
  router.post("/", target.create);

  // Retrieve all target
  router.get("/", target.findAll);

  // Retrieve a single Target with id
  router.get("/:id", target.findOne);

  // Update a Target with id
  router.put("/:id", target.update);

  // Delete a Target with id
  router.delete("/:id", target.delete);

  // Create a new Target
  router.delete("/", target.deleteAll);

  app.use('/api/target', router);
};
