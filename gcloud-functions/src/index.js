'use strict';
import 'babel-polyfill';
import { apiKey } from './apiKey.js';
import Buffer from 'safe-buffer';
import * as Memories from './database/db.js';
import { corsHeader } from './constants.js';

Buffer.Buffer;

const validated = (key) => apiKey === key;

const isOptionsRequest = (req, res) => {
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'x-api-key, Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return true;
  } else {
    return false;
  }
};

exports.login = (req, res) => {
  res.set('Access-Control-Allow-Origin', corsHeader);
  if (!isOptionsRequest(req, res)) {
    if (validated(req.get('x-api-key'))) {
      Memories.login(req.query.login)
        .then(response => {
          if (response === true) {
            res.status(200).send(response);
          } else {
            res.status(500).send('Success');
          }
        })
        .catch(() => res.status(500).send('Success'));
    } else {
      res.status(500).send('Success');
    }
  }
};

exports.retrieveAll = (req, res) => {
  res.set('Access-Control-Allow-Origin', corsHeader);
  if (!isOptionsRequest(req, res)) {
    if (validated(req.get('x-api-key'))) {
      Memories.retrieveMemories()
        .then(response => res.send(response))
        .catch(error => res.send(error));
    } else {
      res.send('');
    }
  }
};

exports.retrieveByMonthAndYear = (req, res) => {
  res.set('Access-Control-Allow-Origin', corsHeader);
  if (!isOptionsRequest(req, res)) {
    if (validated(req.get('x-api-key'))) {
      Memories.retrieveMemoriesByMonthAndYear(req.query.month, req.query.year)
        .then(response => res.send(response))
        .catch(error => res.send(error));
    } else {
      res.send('');
    }
  }
};

exports.retrieveByYear = (req, res) => {
  res.set('Access-Control-Allow-Origin', corsHeader);
  if (!isOptionsRequest(req, res)) {
    if (validated(req.get('x-api-key'))) {
      Memories.retrieveMemoriesByYear(req.query.year)
        .then(response => res.send(response))
        .catch(error => res.send(error));
    } else {
      res.send('');
    }
  }
};

exports.edit = (req, res) => {
  res.set('Access-Control-Allow-Origin', corsHeader);
  if (!isOptionsRequest(req, res)) {
    if (validated(req.get('x-api-key'))) {
      Memories.editMemory(req.body)
        .then((status) => res.sendStatus(status))
        .catch(error => res.send(error));
    } else {
      res.send('');
    }
  }
};

exports.deleteMemory = (req, res) => {
  res.set('Access-Control-Allow-Origin', corsHeader);
  if (!isOptionsRequest(req, res)) {
    if (validated(req.get('x-api-key'))) {
      Memories.deleteMemory(req.body)
        .then((status) => res.sendStatus(status))
        .catch(error => res.send(error));
    } else {
      res.send('');
    }
  }
};

exports.save = (req, res) => {
  res.set('Access-Control-Allow-Origin', corsHeader);
  if (!isOptionsRequest(req, res)) {
    if (validated(req.get('x-api-key'))) {
      Memories.saveMemory(req.body)
        .then(() => res.sendStatus(200))
        .catch(error => res.send(error));
    } else {
      res.send('');
    }
  }
};