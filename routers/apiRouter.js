const pollController = require('../controllers/pollController');
const express = require('express');

const Router = express.Router();

Router.route('/poll')
   .get(pollController.getAllPolls)
   .post(pollController.createNewPoll)

Router.route('/poll/:id')
    .get(pollController.getPollById)
    .post(pollController.updatePoll)

module.exports = Router;