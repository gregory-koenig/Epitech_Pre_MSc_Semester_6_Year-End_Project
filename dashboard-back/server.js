const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "https://front-saas-dashboard.web.app", "https://front-saas-dashboard.firebaseapp.com"]
};

const db = require("./app/models");
const dbConfig = require("./app/config/db.config")
const Role = db.role;

db.mongoose.connect(`mongodb+srv://${dbConfig.USER}:${dbConfig.PASS}@${dbConfig.HOST}/${dbConfig.DB}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "API" });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/target.routes")(app);
require("./app/routes/detect.routes")(app);
require("./app/routes/attack.routes")(app);
require("./app/routes/stat.routes")(app);
require("./app/routes/rss.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
