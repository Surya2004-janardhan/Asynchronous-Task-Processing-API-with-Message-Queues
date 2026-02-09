/**
 * consumer.js - RabbitMQ Message Consumer
 * 
 * This file:
 * 1. Connects to RabbitMQ.
 * 2. Listens for messages on 'task_queue'.
 * 3. Passes messages to the worker service for processing.
 * 4. Handles ACKs (acknowledgments) only after successful processing.
 */

const amqp = require('amqplib');
const { processTask } = require('../services/worker');

async function connect() {
    try {
        const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`);
        const channel = await connection.createChannel();
        const queue = 'task_queue';

        await channel.assertQueue(queue, { durable: true });
        channel.prefetch(1); // Process one task at a time

        console.log(`[MQ] Worker waiting for messages in ${queue}...`);

        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                const success = await processTask(msg);
                if (success) {
                    channel.ack(msg);
                } else {
                    // Requeue on failure or send to dead letter queue
                    channel.nack(msg, false, true); 
                }
            }
        });
    } catch (error) {
        console.error('[MQ] Consumer Connection Error:', error);
        // Retry logic should go here in a production app
    }
}

module.exports = { connect };
