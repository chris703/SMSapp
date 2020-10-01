const {Router} = require('express');
const router = Router();

const {indexController, postMessage, receiveMessage} = require('../controllers/index.controller');

require('../controllers/index.controller')
//main Routes
router.get('/', indexController);

//Send a SMS
router.post('/send-sms', postMessage);

//Receive a SMS
router.post('/receivesms', receiveMessage);

module.exports = router;