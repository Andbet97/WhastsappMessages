const client = require('../config/whatsappClient');

// Function to send messages
const sendMessage = async (number, message) => {
  try {
    // Verify if number have correct format
    const chatId = number.includes('@c.us') ? number : `${number}@c.us`;
    // Send message
    await client.sendMessage(chatId, message);
    // Response wit success message
    return { success: true, message: 'Message sended successfuly!' };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Export functions
module.exports = { sendMessage };