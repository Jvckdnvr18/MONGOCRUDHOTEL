const express = require('express');
const router = express.Router();
const roomController = require('/Users/Admin/Documents/Back_end_MONGOCRUD/controllers/roomcontrollers');

router.get('/rooms', roomController.getRooms);
router.get('/rooms/:id', roomController.getRoom);
router.post('/rooms', roomController.createRoom);
router.put('/rooms/:id', roomController.updateRoom);
router.delete('/rooms/:id', roomController.deleteRoom);

module.exports = router;