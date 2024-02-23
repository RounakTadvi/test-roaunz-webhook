const express = require("express");
const bodyParser = require("body-parser");
var zlib = require("zlib");
const { default: axios } = require("axios");

const app = express();
const port = 5000;

const ROANUZ_PROJECT_KEY = "RS_P_1744648817841672196";
const ROANUZ_API_KEY = "RS5:e9d2ee67cebda9cab0f180f317f5cd55";

// =========================Function for auth of Roaunz API
const authResponseApi = async () => {
  try {
    const response = await axios.post(
      `https://api.sports.roanuz.com/v5/core/${ROANUZ_PROJECT_KEY}/auth/`,
      { api_key: ROANUZ_API_KEY },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const token = response.data.data.token;
    return token;
  } catch (error) {
    return error.message;
  }
};

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
// app.use(rawBody);

app.get("/helth", function (req, res) {
  res.status(200).send("Welcome to home route");
});

app.post("/match/feed/v1/", rawBody, function (req, res) {
  console.log("Received");
  var buffer = Buffer.concat(req.chunks);
  if (req.headers["rs-api-key"] == ROANUZ_API_KEY) {
    zlib.unzip(buffer, (err, buffer) => {
      if (!err) {
        data = JSON.parse(buffer.toString());
        // const matchData = {
        //   matchName: data.data.name,
        //   matchKey: data.data.key,
        //   matchSortName: data.data.short_name,
        //   tournamentKey: data.data.tournament,
        //   teamsA: data.data.teams.a,
        //   teamsB: data.data.teams.b,
        //   winner: data.data.winner,
        //   title: data.data.title,
        //   play_status: data.data.play_status,
        //   start_at_local: data.data.start_at_local,
        //   toss: data.data.toss,
        //   play: {
        //     firstBatting: data.data.play.first_batting,
        //     dayNumber: data.data.play.day_number,
        //     oversPerInnings: data.data.play.overs_per_innings,
        //     reducedOvers: data.data.play.reduced_overs,
        //     target: data.data.play.target,
        //     result: data.data.play.result,
        //     inningsOrder: data.data.play.innings_order,
        //     innings: data.data.play.innings,
        //     live: data.data.play.live,
        //     relatedBalls: data.data.play.related_balls,
        //   },
        // };

        // const live = data.data.play.live;
        const match = data.data;

        const responseData = datafunction(match);

        console.log({ Data: data }, { matchData: responseData });
        res.send(JSON.stringify({ status: true }));
      } else {
        res.send(JSON.stringify({ status: false }));
      }
    });
  } else {
    console.log("Auth Failed");
  }
});

function datafunction(data) {
  const response = {
    matchKey: data.key,
    matchName: data.name,
    matchShortName: data.short_name,
    matchSubTitle: data.sub_title,
    matchStatus: data.status,
    matchStartAt: datafunction.start_at,
    tournamentKey: data.tournament.key,
    tournamentShortName: data.tournament.short_name,
    sport: data.sport,
    winner: data.winner,
    teamA: data.teams.a.code,
    teamAKey: data.teams.a.key,
    teamB: data.teams.b.code,
    teamBKey: data.teams.b.key,
    messages: data.message,
    gender: data.gender,
    format: data.format,
    title: data.title,
    play_status: data.play_status,
    // expected_start_at: null,
    toss: `${
      data.toss.winner === "a" ? data.temas.a.code : data.teams.b.code
    } won the toss and elected to ${data.toss.elected} first`,
    playInfo: {
      firstBatting: `${
        data.play.first_batting === "a" ? data.temas.a.code : data.teams.b.code
      }`,
      dayNumber: data.play.day_number,
      oversPerInnings: data.play.overs_per_innings,
      reducedOvers: data.play.reduced_overs,
      target: data.play.target,
      result: data.play.result,
      inningsOrder: data.play.innings_order,
    },
    playIningInfo: {
      "play.innings[0]===b_1 ? teams.b.code: teams.a.code": {
        index: data.play.innings[0].index,
        overs: data.play.innings[0].overs,
        isCompleted: data.play.innings[0].is_completed,
        score_string: data.play.innings[0].score_str,
        score_runs: data.play.innings[0].score.runs,
        score_balls: data.play.innings[0].score.balls,
        score_fours: data.play.innings[0].score.fours,
        score_sixes: data.play.innings[0].score.sixes,
        score_dot_balls: data.play.innings[0].score.dot_balls,
        score_run_rate: data.play.innings[0].score.run_rate,
        wickets: data.play.innings[0].wickets,
        extra_runs_extra: data.play.innings[0].extra_runs.extra,
        extra_bye: data.play.innings[0].extra_runs.bye,
        extra_leg_bye: data.play.innings[0].extra_runs.leg_bye,
        extra_wide: data.play.innings[0].extra_runs.wide,
        extra_no_ball: data.play.innings[0].extra_runs.no_ball,
        extra_penalty: data.play.innings[0].extra_runs.penalty,
        balls_breakup_balls: data.play.innings[0].balls_breakup.balls,
        balls_breakup_dot_balls: data.play.innings[0].balls_breakup.dot_balls,
        balls_breakup_wides: data.play.innings[0].balls_breakup.wides,
        balls_breakup_no_balls: data.play.innings[0].balls_breakup.no_balls,
        batting_order: data.play.innings[0].batting_order,
        bowling_order: data.play.innings[0].bowling_order,
        wicket_order: data.play.innings[0].wicket_order,
      },
      //   "play.innings[1]===b_1 ? teams.b.code: teams.a.code": {
      //     "index": "play.innings[1].index",
      //     "overs": "play.innings[1].overs",
      //     "isCompleted": "play.innings[1].is_completed",
      //     "score_string": "play.innings[1].score_str",
      //     "score_runs": "play.innings[1].score.runs",
      //     "score_balls": "play.innings[1].score.balls",
      //     "score_fours": "play.innings[1].score.fours",
      //     "score_sixes": "play.innings[1].score.sixes",
      //     "score_dot_balls": "play.innings[1].score.dot_balls",
      //     "score_run_rate": "play.innings[1].score.run_rate",
      //     "wickets": "play.innings[1].wickets",
      //     "extra_runs_extra": "play.innings[1].extra_runs.extra",
      //     "extra_bye": "play.innings[1].extra_runs.bye",
      //     "extra_leg_bye": "play.innings[1].extra_runs.leg_bye",
      //     "extra_wide": "play.innings[1].extra_runs.wide",
      //     "extra_no_ball": "play.innings[1].extra_runs.no_ball",
      //     "extra_penalty": "play.innings[1].extra_runs.penalty",
      //     "balls_breakup_balls": "play.innings[1].balls_breakup.balls",
      //     "balls_breakup_dot_balls": "play.innings[1].balls_breakup.dot_balls",
      //     "balls_breakup_wides": "play.innings[1].balls_breakup.wides",
      //     "balls_breakup_no_balls": "play.innings[1].balls_breakup.no_balls",
      //     "batting_order": "play.innings[1].batting_order",
      //     "bowling_order": "play.innings[1].bowling_order",
      //     "wicket_order": "play.innings[1].wicket_order"
      //   }
      // },
      // "playLiveInfo": {
      //   "live_innings": "play.live[0]===b_1 ? teams.b.code: teams.a.code",
      //   "batting_team": "play.live.batting_team ===b ? teams.b.code: teams.a.code",
      //   "bowling_team": "play.live.bowling_team===b ? teams.b.code: teams.a.code",
      //   "last_ball_key": "play.live.last_ball_key",
      //   "striker_key": "play.live.recent_players.striker.name",
      //   "non_striker_key": "play.live.recent_players.non_striker.name",
      //   "bowler_key": "play.live.recent_players.bowler.name",
      //   "match_break": "play.live.match_break",
      //   "live_score_runs": "play.live.score.runs",
      //   "live_score_balls": "play.live.score.balls",
      //   "live_score_wickets": "play.live.score.wickets",
      //   "live_score_run_rate": "play.live.score.run_rate",
      //   "live_score_title": "play.live.score.title",
      //   "live_score_overs": "play.live.score.overs",
      //   "live_score_msg_lead_by": "play.live.score.msg_lead_by",
      //   "live_score_msg_trail_by": "play.live.score.msg_trail_by",
      //   "required_score": "play.live.required_score",
      //   "recent_overs_repr": "play.live.recent_overs_repr"
    },
  };

  return response;
}

///get live match

// async function getMatch(matchKey) {
//   try {
//     const rs_token = await authResponseApi();
//     let roaunzResponse;
//     if (rs_token) {
//       roaunzResponse = await axios.get(
//         `https://api.sports.roanuz.com/v5/cricket/${ROANUZ_PROJECT_KEY}/match/${matchKey}/`,
//         {
//           headers: {
//             "rs-token": rs_token,
//           },
//         }
//       );
//     }
//     console.log("roaunzResponse.data.data.data", roaunzResponse.data.data);
//     const data = roaunzResponse.data.data;
//     return data;
//   } catch (error) {
//     console.log("clg in getMatch function", error);
//     return error;
//   }
// }

// app.get("/getmatch/:matchkey", async function (req, res) {
//   try {
//     console.log("Get Live Match");
//     const { matchkey } = req.params;
//     const data = await getMatch(matchkey);
//     res.status(200).send({ message: "success", data: data });
//   } catch (error) {
//     res.status(500).send({ message: "Internal server error", error: error });
//   }
// });

// ////Ball by Ball
// async function getMatchBallByBall(matchKey) {
//   try {
//     const rs_token = await authResponseApi();
//     let roaunzResponse;
//     if (rs_token) {
//       roaunzResponse = await axios.get(
//         `https://api.sports.roanuz.com/v5/cricket/${ROANUZ_PROJECT_KEY}/match/${matchKey}/ball-by-ball/`,
//         {
//           headers: {
//             "rs-token": rs_token,
//           },
//         }
//       );
//     }
//     console.log("roaunzResponse.data.data", roaunzResponse.data.data);
//     const data = roaunzResponse.data.data;
//     return data;
//   } catch (error) {
//     console.log("clg in getMatch function", error);
//     return error;
//   }
// }

// app.get("/getmatch/ballbyball/:matchkey", async function (req, res) {
//   console.log("Ball By Ball");
//   try {
//     const { matchkey } = req.params;
//     const data = await getMatchBallByBall(matchkey);
//     res.status(200).send({ message: "success", data: data });
//   } catch (error) {
//     res.status(500).send({ message: "Internal server error", error: error });
//   }
// });

// app.get("/getfeaturedtournament/:countrycode", async function (req, res) {
//   const { countrycode } = req.params;
//   try {
//     const rs_token = await authResponseApi();
//     let roaunzResponse;
//     if (rs_token) {
//       // `https://api.sports.roanuz.com/v5/cricket/${ROANUZ_PROJECT_KEY}/featured-tournaments/`,
//       roaunzResponse = await axios.get(
//         `https://api.sports.roanuz.com/v5/cricket/${ROANUZ_PROJECT_KEY}/association/${countrycode}/featured-tournaments/`,
//         {
//           headers: {
//             "rs-token": rs_token,
//           },
//         }
//       );
//     }
//     console.log("roaunzResponse.data.data", roaunzResponse.data.data);
//     const data = roaunzResponse.data.data;
//     res.status(200).send({ message: "success", data: data });
//   } catch (error) {
//     console.log("clg in getMatch function", error);
//     res.status(500).send({ message: "Internal server error", error: error });
//   }
// });

// app.get("/response", async function (req, res) {
//   try {
//     const data = data;
//   } catch (error) {
//     res.status(500).send({ message: "Somthing went wrong ", error: error });
//   }
// });

// app.get("/featured-matches/:tournamentKey", async function (req, res) {
//   try {
//     const tournamentKey = req.params.tournamentKey;

//     const rsToken = await authResponseApi();

//     if (!rsToken) {
//       return res.status(500).json({ error: "Failed to retrieve RS token" });
//     }

//     const roaunzResponse = await axios.get(
//       `https://api.sports.roanuz.com/v5/cricket/${ROANUZ_PROJECT_KEY}/tournament/${tournamentKey}/featured-matches-2/`,
//       {
//         headers: {
//           "rs-token": rsToken,
//         },
//       }
//     );

//     const responseData = roaunzResponse.data.data; // Assuming you want to extract the 'data' property

//     console.log("roaunzResponse.data.data", responseData);

//     res.status(200).json({ data: responseData });
//   } catch (error) {
//     console.error("Error in getMatch function:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
