const express = require("express");
const bodyParser = require("body-parser");
var zlib = require("zlib");

const app = express();
const port = 5000;

function rawBody(req, res, next) {
  req.rawBody = "";
  req.chunks = [];

  req.on("data", function (chunk) {
    console.log("Chunk", chunk, typeof chunk);
    req.chunks.push(Buffer.from(chunk));
  });
  req.on("end", function () {
    next();
  });
}

app.use(bodyParser.json());
app.use(rawBody);

app.get("/helth", function (req, res) {
  res.status(200).send("Welcome to home route");
});

// const ROANUZ_PROJECT_KEY = "RS_P_1744648817841672196";
const ROANUZ_API_KEY = "RS5:e9d2ee67cebda9cab0f180f317f5cd55";

app.post("/match/feed/v1/", function (req, res) {
  console.log("Received");
  var buffer = Buffer.concat(req.chunks);
  if (req.headers["rs-api-key"] == ROANUZ_API_KEY) {
    zlib.unzip(buffer, (err, buffer) => {
      if (!err) {
        data = JSON.parse(buffer.toString());
        const matchData = {
          matchName: data.data.name,
          matchKey: data.data.key,
          matchSortName: data.data.short_name,
          tournamentKey: data.data.tournament,
          teamsA: data.data.teams.a,
          teamsB: data.data.teams.b,
          winner: data.data.winner,
          title: data.data.title,
          play_status: data.data.play_status,
          start_at_local: data.data.start_at_local,
          toss: data.data.toss,
          play: {
            firstBatting: data.data.play.first_batting,
            dayNumber: data.data.play.day_number,
            oversPerInnings: data.data.play.overs_per_innings,
            reducedOvers: data.data.play.reduced_overs,
            target: data.data.play.target,
            result: data.data.play.result,
            inningsOrder: data.data.play.innings_order,
            innings: data.data.play.innings,
            live: data.data.play.live,
            relatedBalls: data.data.play.related_balls,
          },
        };

        const live = data.data.data.data.play.live;

        console.log({ Data: data }, { matchData: matchData }, { live: live });
        res.send(JSON.stringify({ status: true }));
      } else {
        res.send(JSON.stringify({ status: false }));
      }
    });
  } else {
    console.log("Auth Failed");
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
