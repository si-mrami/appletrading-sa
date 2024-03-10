const mongoose = require("mongoose");
// v7c50829SPbKG6s3
mongoose
  .connect(
    "mongodb+srv://doadmin:v7c50829SPbKG6s3@applestore-db-de7a7ba9.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=applestore-db"
  )
  .then(() => {
    console.log("Db Connected!");
  })
  .catch((err) => {
    throw err;
  });

const newSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const users = mongoose.model("users", newSchema);

module.exports = users;
