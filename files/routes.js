const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get("/allUser", controller.getUser);

module.exports = router;