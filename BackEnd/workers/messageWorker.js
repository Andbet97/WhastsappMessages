const { Worker } = require('bullmq');
const Redis = require('ioredis');

const redisConnection = new Redis({
  host: process.env.REDIS_URL ?? '127.0.0.1',
  port: process.env.REDIS_PORT ?? 6379,
  maxRetriesPerRequest: null, // Required for BullMQ
});

// Create a Worker to process messages in the queue.
const messageWorker = new Worker(
  'messageQueue',
  async (job) => {
    console.log('Processing message in the queue:');
    console.log('From:', job.data.from);
    console.log('Message:', job.data.body);
    console.log('Timestamp:', job.data.timestamp);
  },
  { connection: redisConnection }
);

messageWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed!`);
});
  
messageWorker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});

console.log('Message worker running...');

module.exports = messageWorker;
