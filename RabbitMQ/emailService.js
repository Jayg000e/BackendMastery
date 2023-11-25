const amqp = require('amqplib');

const RABBITMQ_SERVER = 'amqp://localhost';
const QUEUE_NAME = 'emailQueue';

async function startEmailService() {
  try {
    const connection = await amqp.connect(RABBITMQ_SERVER);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);

    channel.consume(QUEUE_NAME, (msg) => {
      if (msg !== null) {
        const user = JSON.parse(msg.content.toString());
        sendEmail(user);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error in Email Service:', error);
  }
}

function sendEmail(user) {
  console.log(`Sending email to ${user.email}`);
  // Email sending logic goes here
}

startEmailService();
