const db = require("../models");
const Target = db.target;

// Create and Save a new Target
exports.create = (req, res) => {
  // Validate request
  if (!req.body.url) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Target
  const target = new Target({
    url: req.body.url,
    description: req.body.description,
    status: new Date()
  });

  // Save Target in the database
  target
    .save(target)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Target."
      });
    });
};

// Retrieve all Target from the database.
exports.findAll = (req, res) => {
  const url = req.query.url;
  var condition = url ? { url: { $regex: new RegExp(url), $options: "i" } } : {};

  Target.find(condition)
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

// Find a single Target with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Target.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Target with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Target with id=" + id });
    });
};

// Update a Target by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Target.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Target with id=${id}. Maybe Target was not found!`
        });
      } else res.send({ message: "Target was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Target with id=" + id
      });
    });
};

// Delete a Target with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Target.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Target with id=${id}. Maybe Target was not found!`
        });
      } else {
        res.send({
          message: "Target was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Target with id=" + id
      });
    });
};

// Delete all Target from the database.
exports.deleteAll = (req, res) => {
  Target.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Target were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all target."
      });
    });
};
