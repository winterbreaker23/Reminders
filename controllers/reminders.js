const Reminders = require('../models/reminders');
const { Op } = require('sequelize');

module.exports = {
  // POST /reminders
  async createReminder(req, res) {
    try {
      const { description, date, user } = req.body;
      
      // Create the reminder
      const reminder = await Reminders.create({ description, date, user });
      
      // Respond with the created reminder
      return res.status(201).json(reminder);
    } catch (error) {
      console.error('Error creating reminder:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // GET /reminders
  async getAllReminders(req, res) {
    try {
      const { user, after } = req.query;
      const where = {};

      if (user) {
        where.user = user;
      }
      if (after) {
        where.date = { [Op.gte]: new Date(parseInt(after, 10)) };
      }

      // Fetch all reminders based on filters
      const reminders = await Reminders.findAll({
        where,
        order: [['id', 'ASC']],
      });

      return res.status(200).json(reminders);
    } catch (error) {
      console.error('Error fetching reminders:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // GET /reminders/:id
  async getReminderById(req, res) {
    try {
      const { id } = req.params;
      const reminder = await Reminders.findByPk(id);

      if (reminder) {
        return res.status(200).json(reminder);
      } else {
        return res.status(404).json({ error: 'ID not found' });
      }
    } catch (error) {
      console.error('Error fetching reminder by ID:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // DELETE, PUT, PATCH /reminders/:id
  notAllowed(req, res) {
    return res.status(405).json({ error: 'Method Not Allowed' });
  },
};
