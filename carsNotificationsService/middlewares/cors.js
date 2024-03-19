const cors = require("cors");

const corsOptions = {
  origin: ["http://127.0.0.1:5500", "http://192.168.1.17:8081"],
  optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);
