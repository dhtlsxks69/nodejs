const express = require('express');

const { isLoggedIn } = require('../middlewares');
const { follow } = require('../controllers/user');

const router = express.Router();

// POST /user/:id/follow
// :id 부분이 req.params.id가 된다.
router.post('/:id/follow', isLoggedIn, follow);

module.exports = router;