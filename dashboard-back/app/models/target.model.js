module.exports = mongoose => {
  const Target = mongoose.model(
    "target",
    mongoose.Schema(
      {
        url: String,
        description: String,
        status: Date
      }
    )
  );

  return Target;
};
