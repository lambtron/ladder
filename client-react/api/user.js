/**
 * Created by karl on 05/02/2017.
 */
'use strict';

export const fetchUsers = () => {
  const API_ENDPOINT = `/api/user`;

  return fetch(API_ENDPOINT)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json.map(({ name, gif, rating, games }) => ({
        name,
        gif,
        rating,
        games
      }));
    });
};