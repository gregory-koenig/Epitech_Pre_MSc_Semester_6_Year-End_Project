const mongoose = require("mongoose");

module.exports = mongoose => {
  const Stat = mongoose.model(
    "stat",
    mongoose.Schema(
      {
        time: Date,
        type: {
            type: String,
            enum : ['scan','attack'],
            //default: 'default'
        },
        val: Number
      }
    )
  );

  return Stat;
};
