const express = require('express');

// logic for controlling functions are located in controllers
const profilesController = require('../controllers/profiles.controller')

const profilesRouter = express.Router();
profilesRouter.get('/', profilesController.getProfiles)
profilesRouter.post('/', profilesController.postProfile)
profilesRouter.put('/:id', profilesController.updateProfile)
profilesRouter.delete('/:id', profilesController.deleteProfile)

module.exports = profilesRouter;