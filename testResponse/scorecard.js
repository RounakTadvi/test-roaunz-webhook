const scoreCard = (dataConvert) => {
  const plaingStatus = dataConvert.play_status;
  console.log("=============playing status", plaingStatus);
  const matchName = dataConvert.short_name;
  const isLive = dataConvert.play.live;
  if (isLive === null)
    return `MatchKey:- ${dataConvert.key}, matchName:- ${matchName}is not live`;

  // console.log('scoreAArray', scoreAArray, 'scoreAkey', scoreAkey, 'scoreBArray', scoreBArray, 'scoreBkey', scoreBkey);
  const liveInnings = dataConvert.play.live?.innings.split("_");
  const liveInningsKey = liveInnings?.length - 1;

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
            score: playerInfo.score[liveInningsKey],
          }
        : null;
    })
    .filter((player) => player !== null);
  //   const scoreArray = playerListTeamA.map((player) => {
  //     return {
  //       batting: player.score?.batting?.score,
  //       bowling: player.score?.bowling?.score,
  //       fielding: player.score.feilding,
  //     };
  //   });
  //   console.log("playerListTeamA", scoreArray);

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
            score: playerInfo.score[liveInningsKey],
          }
        : null;
    })
    .filter((player) => player !== null);

  //   const scoreArrayB = playerListTeamB.map((player) => {
  //     return {
  //       batting: player.score?.batting?.score,
  //       bowling: player.score?.bowling?.score,
  //       fielding: player.score.feilding,
  //     };
  //   });
  //   console.log("playerListTeamB", scoreArrayB);

  const data = {
    matchKey: dataConvert.key,
    matchName: dataConvert.short_name,
    teamADetail: {
      teamName: dataConvert.teams.a.code,
      isBatting: dataConvert.play.live.batting_team === "a" ? true : false,
      isCompletedInning:
        dataConvert.play.innings[`a_${liveInningsKey}`].is_completed,
      overs: dataConvert.play.innings[`a_${liveInningsKey}`].overs,
      scoreStr: dataConvert.play.innings[`a_${liveInningsKey}`].score_str,
      LiveScore: `${
        dataConvert.play.innings[`a_${liveInningsKey}`].score.runs
      }/${dataConvert.play.innings[`a_${liveInningsKey}`].wickets}`,
    },
    teamBDetail: {
      teamName: dataConvert.teams.b.code,
      isBatting: dataConvert.play?.live?.batting_team === "b" ? true : false,
      overs: dataConvert.play.innings[`b_${liveInningsKey}`].overs,
      isCompletedInning:
        dataConvert.play.innings[`b_${liveInningsKey}`].is_completed,
      scoreStr: dataConvert.play.innings[`b_${liveInningsKey}`].score_str,
      LiveScore: `${
        dataConvert.play.innings[`b_${liveInningsKey}`].score.runs
      }/${dataConvert.play.innings[`b_${liveInningsKey}`].wickets}`,
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
    play: dataConvert.play,
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
