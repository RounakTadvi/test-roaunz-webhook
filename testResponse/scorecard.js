const scoreCard = (dataConvert) => {
  // console.log('scoreAArray', scoreAArray, 'scoreAkey', scoreAkey, 'scoreBArray', scoreBArray, 'scoreBkey', scoreBkey);
  const liveInnings = dataConvert.play.live?.innings.split("_");
  console.log(
    "liveInnings",
    liveInnings,
    "liveInning[1]",
    liveInnings[1],
    typeof liveInnings[1]
  );

  const playerListTeamA = dataConvert.squad.a.playing_xi
    .map((playerKey) => {
      const playerInfo = dataConvert.players[playerKey];
      return playerInfo
        ? {
            playerKey: playerInfo.player.key,
            playerName: playerInfo.player.name,
            playerGender: playerInfo.player.gender,
            playerSeasionalRole: playerInfo.player.seasonal_role,
            playerRole: playerInfo.player.roles,
            score: playerInfo.score,
          }
        : null;
    })
    .filter((player) => player !== null);

  const playerListTeamB = dataConvert.squad.b.playing_xi
    .map((playerKey) => {
      const playerInfo = dataConvert.players[playerKey];
      return playerInfo
        ? {
            playerKey: playerInfo.player.key,
            playerName: playerInfo.player.name,
            playerGender: playerInfo.player.gender,
            playerSeasionalRole: playerInfo.player.seasonal_role,
            playerRole: playerInfo.player.roles,
            score: playerInfo.score,
          }
        : null;
    })
    .filter((player) => player !== null);

  const data = {
    matchKey: dataConvert.key,
    matchName: dataConvert.short_name,
    teamADetail: {
      teamName: dataConvert.teams.a.code,
      isBatting: dataConvert.play.live.batting_team === "a" ? true : false,
      isCompletedInning: dataConvert.play.innings.a_1.is_completed,
      overs: dataConvert.play.innings.a_1.overs,
      scoreStr: dataConvert.play.innings.a_1.score_str,
      LiveScore: `${dataConvert.play.innings.a_1.score.runs}/${dataConvert.play.innings.a_1.wickets}`,
    },
    teamBDetail: {
      teamName: dataConvert.teams.b.code,
      isBatting: dataConvert.play.live.batting_team === "b" ? true : false,
      overs: dataConvert.play.innings.b_1.overs,
      isCompletedInning: dataConvert.play.innings.b_1.is_completed,
      scoreStr: dataConvert.play.innings.b_1.score_str,
      LiveScore: `${dataConvert.play.innings.b_1.score.runs}/${dataConvert.play.innings.b_1.wickets}`,
    },
    striker: {
      key: dataConvert.play.live.recent_players.striker.key,
      name: dataConvert.play.live.recent_players.striker.name,
      stats: dataConvert.play.live.recent_players.striker.stats,
    },
    non_striker: {
      key: dataConvert.play.live.recent_players.non_striker.key,
      name: dataConvert.play.live.recent_players.non_striker.name,
      stats: dataConvert.play.live.recent_players.non_striker.stats,
    },
    bowler: {
      key: dataConvert.play.live.recent_players.bowler.key,
      name: dataConvert.play.live.recent_players.bowler.name,
      stats: dataConvert.play.live.recent_players.bowler.stats,
    },
    teamAPlayerList: {
      playingXI: dataConvert.squad.a.playing_xi,
      playersList: playerListTeamA,
    },
    teamBPlayerList: {
      playingXI: dataConvert.squad.b.playing_xi,
      playersList: playerListTeamB,
    },
  };
  return data;
};

module.exports = scoreCard;
