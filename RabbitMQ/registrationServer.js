const express = require('express');
const amqp = require('amqplib');

const app = express();
app.use(express.json());
const port = 3000;

const RABBITMQ_SERVER = 'amqp://localhost';
const QUEUE_NAME = 'emailQueue';

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(RABBITMQ_SERVER);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);
    return channel;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    process.exit(1);
  }
}

let channel;
connectRabbitMQ().then(ch => channel = ch);

app.post('/register', (req, res) => {
  const user = req.body;
  // Database Operation Goes Here: Save the user data to your database
  
  // This message could trigger asynchronous operations like sending a welcome email.
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(user)));
  res.send('User registered successfully');
});

app.listen(port, () => {
  console.log(`Web server running at http://localhost:${port}`);
});
