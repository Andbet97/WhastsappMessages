const { Queue } = require('bullmq');
const Redis = require('ioredis');

// Configure Redis
const redisConnection = new Redis({
  host: process.env.REDIS_URL ?? '127.0.0.1', // hostname on Docker network
  port: process.env.REDIS_PORT ?? 6379,
  maxRetriesPerRequest: null, // Required for BullMQ
});

// Create quee to messages with BullMQ
const messageQueue = new Queue('messageQueue', {
  connection: redisConnection,
  defaultJobOptions: {
    removeOnComplete: false, // Do not automatically delete completed jobs
    removeOnFail: false // Do not automatically delete failed jobs
  },
});

// Export Queue
module.exports = messageQueue;
