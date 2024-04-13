const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/createUser', controller.createUser);
router.get('/userListing', controller.getAllUsers);
router.get('/getUserById', controller.getUserById);
router.put('/updateUserId', controller.updateUser);
router.delete('/deleteUserID', controller.deleteUser);

module.exports = router;
