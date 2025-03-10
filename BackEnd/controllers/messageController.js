const whatsappService = require('../services/whatsappService');
const messageQueue = require('../config/queue');

// Message sender controller
const sendMessage = async (req, res) => {
  // Validate body
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ error: 'Invalid request body. Make sure to send JSON data.' });
  }

  // Recover phone and message
  const { number, message } = req.body;

  // Validate requirments
  if (!number || !message) {
    return res.status(400).json({ error: 'Phone number and message are required!' });
  }
  
  // Validate phone number format
  const phoneRegex = /^\+\d{10,15}$/; // WhatsApp international format
  if (typeof number !== 'string' || !phoneRegex.test(number)) {
    return res.status(400).json({ error: 'Invalid phone number format. Use international format e.g. +1234567890' });
  }

  // Validate message format
  if (typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message must be a non-empty string!' });
  }

  try {
    // Send message with whatsApp service, Delete '+' to number to send correctly
    const response = await whatsappService.sendMessage(number.replace(/^\+/, ''), message);
    // Response json success
    res.json(response);
  } catch (error) {
    // Response json Error
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to get and clear queued messages
const getMessages = async (req, res) => {
  try {
    // Get jobs from the queue (waiting, active, delayed, completed)
    const jobs = await messageQueue.getJobs(['waiting', 'active', 'delayed','completed']);

    // Extract job data and format phone number, reverse because first element are last recived message
    const messages = jobs.reverse().map((job) => ({
      ...job.data,
      from: '+' + job.data.from.replace(/@.*/, ''),
    }));

    // Clear the queue after retrieving the messages
    await messageQueue.obliterate({ force: true });

    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Export controllers
module.exports = { sendMessage, getMessages };
