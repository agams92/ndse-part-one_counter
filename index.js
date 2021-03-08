const express = require("express");
const redis = require("redis");

const port = process.env.PORT || 3001;
const address = process.env.ADDRESS || "localhost";

const app = express();
const redisClient = redis.createClient(`redis://${address}`);
const counterRouter = express.Router();

counterRouter.route("/:bookId/incr").post((req, res) => {
  const counter = req.params.bookId;
  redisClient.incr(counter, (err, rep) => {
    if (err) res.status(500).send(err);
    else {
      console.log(`${counter} - ${rep}`);
      res.json(rep);
    }
  });
});

counterRouter.route("/:bookId").get((req, res) => {
  const counter = req.params.bookId;
  redisClient.get(counter, (err, rep) => {
    if (err) res.status(500).send(err);
    else {
      res.json(rep);
    }
  });
});

app.use("/counter", counterRouter);
app.listen(port, () => console.log(`> counter app is ready on port:${port}`));
