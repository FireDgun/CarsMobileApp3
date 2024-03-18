const express = require("express");
const notificationsRestController = require("../notifications/routes/notificationsRestController");
const { handleError } = require("../utils/handleErrors");
const router = express.Router();

router.use("/notifications", notificationsRestController);

router.use((req, res) => {
  handleError(res, 404, "Path not found");
});

module.exports = router;
