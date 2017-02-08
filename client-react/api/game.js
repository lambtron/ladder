/**
 * Created by karl on 05/02/2017.
 */
'use strict';

export const fetchGames = () => {
  const API_ENDPOINT = `/api/game`;

  return fetch(API_ENDPOINT)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json.map(({winner, winnerOldElo, winnerNewElo, loser, loserOldElo, loserNewElo, createdAt}) => ({
        createdAt,
        winner,
        loser,
        winnerNewElo,
        winnerOldElo,
        winnerDiffElo: winnerNewElo - winnerOldElo,
        loserNewElo,
        loserOldElo,
        loserDiffElo: loserNewElo - loserOldElo,
      }));
    });
};

export const newGame = (payload) => {
  const API_ENDPOINT = '/api/game';

  return fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    return response.json();
  })
  .then(json => {
    return {
      ...json,
      winnerDiffElo: (json.winnerNewElo - json.winnerOldElo),
      loserDiffElo: (json.loserNewElo - json.loserOldElo)
    }
  });
};