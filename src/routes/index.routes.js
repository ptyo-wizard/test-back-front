const router = require("express").Router();
const buffer = require("../store/buffer");
const axios = require("axios");
const { createSellOrder, init } = require("../controllers/index");

router.get("/init", init);

router.get("/all", (req, res) => {
  res.json({ buffer });
});

router.post("/createsell", createSellOrder);

module.exports = router;
