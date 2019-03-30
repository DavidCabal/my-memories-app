import { apiKey } from '../apiKey.js';

export const callApi = (url, callType, bodyData = null, withApiKey = true) => {
  return fetch(url,
    {
      method: callType,
      mode: 'cors',
      headers: {
        "x-api-key": withApiKey ? apiKey : '1234',
        "Content-Type": "application/json"
      },
      body: bodyData != null ? JSON.stringify(bodyData) : bodyData
    })
    .then(response => response)
    .catch(error => console.log(error));
};