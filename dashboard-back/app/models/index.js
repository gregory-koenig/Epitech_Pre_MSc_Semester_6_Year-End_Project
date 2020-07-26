const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.target = require("./target.model.js")(mongoose);
db.stat = require("./stat.model.js")(mongoose);
db.rss = require("./rss.model")(mongoose);

db.ROLES = ["user", "admin"];

module.exports = db;
