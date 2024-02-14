const express = require('express');
const router = express.Router();

const controlEmail = require('../middleware/controlEmail')
const userCtrl = require('../controllers/user');

router.post('/signup', controlEmail, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user/:id', userCtrl.getUserInfos);

module.exports = router;