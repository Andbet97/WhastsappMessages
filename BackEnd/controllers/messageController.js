const whatsappService = require("../services/whatsappService");

// Message sender controller
const sendMessage = async (req, res) => {
  // Validate body
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Invalid request body. Make sure to send JSON data." });
  }

  // Recover phone and message
  const { number, message } = req.body;

  // Validate requirments
  if (!number || !message) {
    return res.status(400).json({ error: "Phone number and message are required!" });
  }
  
  // Validate phone number format
  const phoneRegex = /^\+\d{10,15}$/; // WhatsApp international format
  if (typeof number !== "string" || !phoneRegex.test(number)) {
    return res.status(400).json({ error: "Invalid phone number format. Use international format e.g. +1234567890" });
  }

  // Validate message format
  if (typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ error: "Message must be a non-empty string!" });
  }

  try {
    // Send message with whatsApp service, Delete "+" to number to send correctly
    const response = await whatsappService.sendMessage(number.replace(/^\+/, ""), message);
    // Response json success
    res.json(response);
  } catch (error) {
    // Response json Error
    res.status(500).json({ success: false, error: error.message });
  }
};

// Export controllers
module.exports = { sendMessage };
