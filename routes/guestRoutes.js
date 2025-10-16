const express = require('express');
const router = express.Router();
const guestController = require('/Users/Admin/Documents/Back_end_MONGOCRUD/controllers/guestController');

router.get('/guests', guestController.getGuests);
router.get('/guests/:id', guestController.getGuest);
router.post('/guests', guestController.createGuest);
router.put('/guests/:id', guestController.updateGuest);
router.delete('/guests/:id', guestController.deleteGuest);

module.exports = router;