
const viewsController = require('../controllers/viewsController');
const express = require('express');

const router = express.Router();

router.get('/', viewsController.homePage);
router.get('/poll/:id', viewsController.viewPoll);
router.all('*', viewsController.error404);

module.exports = router;