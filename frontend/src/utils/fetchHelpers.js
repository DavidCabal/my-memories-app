import { apiKey } from '../apiKey.js';

export const callApi = (url, callType, bodyData = null) => {
  return fetch(url,
    {
      method: callType,
      mode: 'cors',
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: bodyData != null ? JSON.stringify(bodyData) : bodyData
    })
    .then(response => response)
    .catch(error => console.log(error));
};