const db = require("../models");
const Stat = db.stat;

exports.newClick = (req, res) => {
  const click = new Stat({
    time: new Date(),
    type: req.body.type,
    val: 1
  });

  click
    .save(click)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Stat."
      });
    });
};

exports.scanClickPerMonth = (req, res) => {
  let condition = { type: "scan" };

  Stat.find(condition)
    .then(data => {

      res.send(data);

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving target."
      });
    });
};


exports.attackClickPerMonth = (req, res) => {
  let condition = { type: "attack" };

  Stat.find(condition)
    .then(data => {

      res.send(data);

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving target."
      });
    });

};
