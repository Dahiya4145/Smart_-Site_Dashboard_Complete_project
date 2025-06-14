// routes/visitorCounter.js
import express from "express";
const router = express.Router();

let visitorCount = 0;

router.get("/visitors", (req, res) => {
  visitorCount++;
  res.json({ count: visitorCount });
});

export default router;
