const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');

router.post('/users/signup', ctrl.registr);

module.exports = router;
