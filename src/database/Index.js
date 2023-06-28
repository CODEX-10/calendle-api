const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://sa:admin@apb-backend.zyqp1bd.mongodb.net/", {
  useUnifiedTopology: true,
  useNewUrlParser: true 
});

mongoose.Promise = global.Promise;

module.exports = mongoose;