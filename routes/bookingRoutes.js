const express = require('express');
const router = express.Router();
const bookingController = require('/Users/Admin/Documents/Back_end_MONGOCRUD/controllers/bookingController');

router.get('/bookings', bookingController.getBookings);
router.get('/bookings/:id', bookingController.getBooking);
router.post('/bookings', bookingController.createBooking);
router.put('/bookings/:id', bookingController.updateBooking);
router.delete('/bookings/:id', bookingController.deleteBooking);

module.exports = router;