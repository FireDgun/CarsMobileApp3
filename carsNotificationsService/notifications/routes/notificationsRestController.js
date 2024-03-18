const express = require("express");
const { handleError } = require("../../utils/handleErrors");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    return res.send("Hello world");
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;
