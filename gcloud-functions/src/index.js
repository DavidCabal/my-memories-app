'use strict';

import { apiKey } from './apiKey.js';
import Buffer from 'safe-buffer';
import * as Memories from './database/db.js';

Buffer.Buffer;

const validated = (key) => apiKey === key;

exports.retrieveAll = (req, res) => {
  if (validated(req.get('x-api-key'))) {
    Memories.retrieveMemories()
      .then(response => res.send(response))
      .catch(error => res.send(error));
  } else {
    res.send('');
  }
};

exports.retrieveByMonthAndYear = (req, res) => {
  if (validated(req.get('x-api-key'))) {
    Memories.retrieveMemoriesByMonthAndYear(req.query.month, req.query.year)
      .then(response => res.send(response))
      .catch(error => res.send(error));
  } else {
    res.send('');
  }
};

exports.retrieveByYear = (req, res) => {
  if (validated(req.get('x-api-key'))) {
    Memories.retrieveMemoriesByYear(req.query.year)
      .then(response => res.send(response))
      .catch(error => res.send(error));
  } else {
    res.send('');
  }
};

exports.save = (req, res) => {
  if (validated(req.get('x-api-key'))) {
    Memories.saveMemory(req.body)
      .then(() => res.sendStatus(200))
      .catch(error => res.send(error));
  } else {
    res.send('');
  }
};