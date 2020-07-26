module.exports = mongoose => {
  return mongoose.model(
    "rss",
    mongoose.Schema(
      {
        title: String,
        url: String,
        pubdate: Date
      }
    )
  );
};

