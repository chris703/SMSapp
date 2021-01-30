const {Router} = require('express');

const router = Router();

const {indexController, postMessage, receiveMessage, sendBulksms} = require('../controllers/index.controller');




//main Routes
router.get('console', indexController);

//Send a SMS
router.post('/send-sms', postMessage);

//Receive a SMS
router.post('/receivesms', receiveMessage);

//send bulksms

router.post('/loadList', sendBulksms);


module.exports = router;

