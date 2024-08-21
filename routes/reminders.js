const router = require('express').Router();
const controller = require('../controllers/reminders');

router.post('/reminders', controller.createReminder);
router.get('/reminders', controller.getAllReminders);
router.get('/reminders/:id', controller.getReminderById);
router.delete('/reminders/:id', controller.notAllowed);
router.put('/reminders/:id', controller.notAllowed);
router.patch('/reminders/:id', controller.notAllowed);

module.exports = router;
