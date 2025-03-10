const supertest = require('supertest');
const { app, server } = require('../index'); // Import server app
const sinon = require('sinon');
const messageQueue = require('../config/queue'); // Import BullMQ instance
const whatsappClient = require('../config/whatsappClient'); // import wweb.js client

const api = supertest(app);

let sendMessage;
let getJobs;
let obliterate;

beforeEach(() => {
  getJobs = sinon.stub(messageQueue, 'getJobs') // Simulate 'getJobs()' without call Redis
  getJobs.onCall(0).resolves([]); // Return empty array at first call
  getJobs.onCall(1).resolves([
    {
      data: {
        from: '573208181086@c.us',
        body: 'Mundo',
        timestamp: 1,
      }
    },
    {
      data: {
        from: '573202884345@c.us',
        body: 'Hola',
        timestamp: 0,
      }
    },
  ]); // Return data on second call
  obliterate = sinon.stub(messageQueue, 'obliterate').resolves(); // Simulate 'obliterate()' without call Redis
  sendMessage = sinon.stub(whatsappClient, 'sendMessage').resolves(); // Simulate 'sendMessage()' without call wweb.js
});

afterEach(() => {
  sinon.restore(); // Resote mock after each test
});

describe('GET /messages', () => {
  
  it('return success with empty array', async () => {
    const response = await api.get('/messages');
    const contents = response.body.messages;
    const success = response.body.success;

    expect(contents).toEqual([]);
    expect(success).toBe(true);
    expect(getJobs.calledOnce).toBe(true); // Verify if call function
    expect(obliterate.calledOnce).toBe(true); // Verify if call function
  });

  it('return success with data', async () => {
    // Preliminary call to consume the first mock (empty array)
    await api.get('/messages');

    const response = await api.get('/messages');
    console.log(response.body);
    const contents = response.body.messages;
    const success = response.body.success;

    expect(contents).toEqual([
      {
        from: '+573202884345',
        body: 'Hola',
        timestamp: 0,
      },
      {
        from: '+573208181086',
        body: 'Mundo',
        timestamp: 1,
      }
    ]); // Verify data order are reversed
    expect(success).toBe(true);

    expect(getJobs.calledTwice).toBe(true); // Verify if call function
    expect(obliterate.calledTwice).toBe(true); // Verify if call function
  });
});

describe('POST /send-message', () => {
  
  it('return success', async () => {
    await api
      .post('/send-message')
      .send({ number: '+573208181086', message: 'Hola' })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(sendMessage.calledOnce).toBe(true); // Verify if call function
  });
});

afterAll(() => {
  server.close();
});
