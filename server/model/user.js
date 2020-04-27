// Data Model for Users
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    username: {type: String},
    password: {type: String},
    key:{type: String},
    usergroup:{type: String},
    email:{type: String}
  }
);

// Export model
module.exports = mongoose.model("user", UserSchema);
