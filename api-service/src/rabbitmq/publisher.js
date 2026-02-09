/**
 * publisher.js - RabbitMQ Message Publisher
 * 
 * This file:
 * 1. Connects to RabbitMQ using amqplib.
 * 2. Asserts a durable queue named 'task_queue'.
 * 3. Provides a 'publishToQueue' function to send JSON tasks.
 */

const amqp = require('amqplib');

async function publishToQueue(queueName, data) {
    try {
        const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`);
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { persistent: true });
        
        console.log(`[MQ] Published message to ${queueName}`);
        
        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error('[MQ] Publish Error:', error);
    }
}

module.exports = { publishToQueue };
