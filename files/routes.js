const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get("/getGround/:id", controller.getGroundId);

router.get("/allGround", controller.getGrounds);

router.get("/allBookings", controller.getBookingsAll);

router.get("/getBookings/:id",controller.getBookings);

router.get("/getBookingsbd/:id", controller.getBookingsbd);

router.post("/insBooking", controller.posBooking);

router.get("/getevents", controller.getEvents);

router.get("/getBookingU/:id", controller.getBookingU);

router.delete("/delBooking", controller.delBooking);

router.get("/getUserCount", controller.selUserCount);

router.get("/getGroundCount", controller.selGroundCount);

router.get("/getBooksCount", controller.selBooksCount);

router.get("/getEventsCount", controller.selEventsCount);

router.get("/getMembers", controller.selUsers);

router.delete("/deleteUser/:id", controller.delUser);

router.delete("/deleteGround/:id", controller.delGround);

router.delete("/deleteEvent/:id", controller.delEvent);

router.put("/updateGround/:id", controller.putGround);

router.post("/addGround", controller.upload.single('img'), controller.insGround);

router.post("/addEvent", controller.upload.single('img_slot'), controller.insEvent);

module.exports = router;