const { Router } = require('express');
const controller = require('./controller');

const router = Router();


router.get("/getGround/:id", controller.getGroundId);

router.get("/allGround", controller.getGrounds);

router.get("/getBookings/:id",controller.getBookings);

router.get("/getBookingsbd/:id", controller.getBookingsbd);

router.post("/insBooking", controller.posBooking);

module.exports = router;