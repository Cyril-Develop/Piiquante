const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/', userCtrl.getUserId);
router.put('/password/:id', userCtrl.updatePassword);
router.get('/:id', userCtrl.getUserInfos);

module.exports = router;