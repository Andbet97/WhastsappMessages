const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const messageQueue = require('./queue');
const { insertMessage } = require('../models/messagesModel');

// Create a new client instance
const client = new Client({
  authStrategy: new LocalAuth(), // Save sesión localAuth strategy
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  }
});

// When the client received QR-Code
client.on('qr', (qr) => {
  console.log('QR Received', qr);
  qrcode.generate(qr, {small: true}); // Generate QR code on terminal
});

// When the client is ready, run this code (only once)
client.on('ready', () => {
  console.log('WhatsApp Client are ready!');
});

// When recive message, add to queue
client.on('message', async (message) => {
  console.log('Recived message:', message.body);
  // If is a broadcast message don't queue
  if (message.broadcast || message.from.includes('broadcast')) {
    console.log('Message was a broadcast');
    return;
  }

  // If is a status message don't queue
  if (message.isStatus || message.from.includes('status')) {
    console.log('Message was a status');
    return;
  }

  const fixedNumber = '+' + message.from.replace(/@.*/, ''); // Sender's number format 

  // Add message to queue
  await messageQueue.add('newMessage', {
    from: fixedNumber,
    body: message.body, // Content
    timestamp: message.timestamp, // Time stamp
  });

  insertMessage(fixedNumber, message.body, message.timestamp);

  console.log('Message enqueued successfully.');
});

// Start client
client.initialize();

// Export client instance
module.exports = client;
