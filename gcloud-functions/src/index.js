'use strict';

import { apiKey } from './apiKey.js';
import Buffer from 'safe-buffer';
import * as Memories from './database/db.js';

Buffer.Buffer;

exports.retrieveAll = (req, res) => {
  Memories.retrieveMemories()
  .then(response => res.send(response))
  .catch(error => res.send(error));
};

exports.retrieveByMonthAndYear = (req, res) => {
  Memories.retrieveMemoriesByMonthAndYear(req.query.month, req.query.year)
  .then(response => res.send(response))
  .catch(error => res.send(error));
};

exports.retrieveByYear = (req, res) => {
  Memories.retrieveMemoriesByYear(req.query.year)
  .then(response => res.send(response))
  .catch(error => res.send(error));
};

exports.save = (req, res) => {
  Memories.saveMemory(req.body)
  .then(() => res.sendStatus(200))
  .catch(error => res.send(error));
};