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

export const newUser = (payload) => {
  const API_ENDPOINT = '/api/user';

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
      return json;
    });
};