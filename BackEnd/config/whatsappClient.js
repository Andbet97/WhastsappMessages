const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

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

// Start client
client.initialize();

// Export client instance
module.exports = client;
