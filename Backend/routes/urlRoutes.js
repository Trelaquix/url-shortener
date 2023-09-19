const express = require("express");
const shortid = require("shortid");
const crypto = require("crypto");
const router = express.Router();

const urlDatabase = {};
const localUrl = "http://localhost:3000/"
const useShortIdPackage = false;

function generateShortIdFromUrl(url) {
  const hash = crypto.createHash("sha256").update(url).digest("hex");
  const shortId = hash.substring(0, 6);
  return shortId;
}

// Go to http://localhost:4000/api/view-database to view database
router.get("/view-database", (req, res) => {
    res.json(urlDatabase);
  });
  
router.post("/shorten", (req, res) => {
  const longUrl = req.body.longUrl;

  const shortUrl = useShortIdPackage
    ? shortid.generate()
    : generateShortIdFromUrl(longUrl);
  urlDatabase[shortUrl] = longUrl;
  res.json({ shortUrl });
});

router.get("/:shortUrl", (req, res) => {
    const shortUrl = req.params.shortUrl;
    const longUrl = urlDatabase[shortUrl];
    if (longUrl) {
      res.json({ originalUrl: longUrl });
    } else {
      res.status(404).send("URL not found");
    }
  });

module.exports = router;
