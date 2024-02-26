const express = require('express');
const router = express.Router();

const controlEmail = require('../middleware/controlEmail')
const authCtrl = require('../controllers/auth');

router.post('/signup', controlEmail, authCtrl.signup);
router.post('/login', authCtrl.login);
router.post('/email', authCtrl.sendEmail);

module.exports = router;