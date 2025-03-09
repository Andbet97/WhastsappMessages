const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const messageQueue = require('./queue');

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
client.on('message_create', async (message) => {
  console.log('Recived message:', message.body);

  // Add message to queue
  await messageQueue.add('newMessage', {
    from: message.from, // Sender's number
    body: message.body, // Content
    timestamp: message.timestamp, // Time stamp
  });

  console.log('Message enqueued successfully.');
});

// Start client
client.initialize();

// Export client instance
module.exports = client;
