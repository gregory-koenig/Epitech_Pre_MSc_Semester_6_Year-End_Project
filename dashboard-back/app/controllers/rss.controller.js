const Parser = require("rss-parser");
const parser = new Parser();
const db = require("../models");
const Rss = db.rss;
const url = "https://www.cert.ssi.gouv.fr/alerte/feed/";

/**
 * Find if RSS already exists in DB
 *
 * @param title
 * @returns {Promise<unknown>}
 */
const findOne = (title) => {
  return new Promise((resolve, reject) => {
    Rss.findOne({ title: title })
      .then((data) => {
        if (!data) resolve(false);
        else resolve(true);
      })
      .catch((err) => reject(false));
  });
};

/**
 * Add RSS into DB
 *
 * @param req
 * @param res
 * @param item
 */
const createPost = (req, res, item) => {
  const rss = new Rss({
    title: item.title,
    url: item.link,
    pubdate: item.pubDate
  });

  rss
    .save(rss)
    .then(data => res.status(200).send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the RSS."
      });
    });
}

/**
 * Get RSS from an URL, parse it into JSON, then if not in, add it into DB
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRssFeed = async (req, res) => {
  try {
    let feed = await parser.parseURL(url);
    for (const item of feed.items) {
      const find = await findOne(item.title);
      if (!find)
        await createPost(req, res, item);
    }
    res.sendStatus(200);
  }
  catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the RSS.",
    });
  }
}

exports.generate = (req, res) => {
  getRssFeed(req, res);
}

/**
 * Find data according to a request
 *
 * @param req
 * @param res
 */
const find = (req, res) => {
  Rss.find({ title: new RegExp(req.body.title, 'iu') }, (error, data) => {
    if (typeof data !== 'undefined' && data.length > 0) {
      let count = data.length;
      res.status(200).send({count, data});
    }
    else
      res.status(500).send({
        message: "No data found!",
      });
  });
}

/**
 * Get RSS by searching in title
 *
 * @param req
 * @param res
 */
const getRssByTitle = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "This field can not be empty!" });
    return;
  }

  find(req, res);
}

exports.search = (req, res) => {
    getRssByTitle(req, res);
};