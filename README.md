# BackendMastery

Welcome to BackendMastery, your comprehensive resource for mastering key backend technologies. This repository, known as BackendTechTutorials, offers practical, easy-to-follow tutorials on essential backend technologies including RabbitMQ, Elasticsearch, and Redis. It's an ideal learning platform for developers seeking to enhance their skills in message brokering, data searching, and caching solutions.

## Features

- **RabbitMQ Tutorials**: Dive into message queuing and asynchronous processing with RabbitMQ.
- **Elasticsearch Guides**: Learn advanced data searching and indexing techniques using Elasticsearch.
- **Redis Experiments**: Explore caching mechanisms and rapid data storage with Redis.

## Getting Started

To get started with BackendMastery, clone this repository and follow the instructions in each tutorial. Each section is designed to provide a hands-on experience with the respective technology.

```bash
git clone https://github.com/Jayg000e/BackendMastery.git
```

### Prerequisites
Ensure you have the following installed:

- **Node.js**: Visit the [Node.js website](https://nodejs.org/) to download and install Node.js.

- **RabbitMQ**:
  - **Download**: Visit the [RabbitMQ Downloads page](https://www.rabbitmq.com/download.html).
  - **Installation**: Follow the installation instructions for your OS. RabbitMQ requires Erlang, so ensure Erlang is installed.
  - **Documentation**: Consult the [official RabbitMQ documentation](https://www.rabbitmq.com/documentation.html) for more details.

- **Elasticsearch**:
  - **Download**: Go to the [Elasticsearch Downloads page](https://www.elastic.co/downloads/elasticsearch).
  - **Installation**: Follow the provided instructions. Remember, Elasticsearch requires Java.
  - **Getting Started**: Refer to the [Elasticsearch Reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) for extensive documentation.

- **Redis**:
  - **Download**: Visit the [Redis Downloads page](https://redis.io/download).
  - **Installation**: Follow the installation guide appropriate for your OS. For Windows, consider using WSL. For Linux and macOS, installation typically involves compiling from source.
  - **Documentation**: The [Redis documentation](https://redis.io/documentation) offers comprehensive installation and usage guides.

### Intallation

Once Node.js, RabbitMQ, Elasticsearch, and Redis are successfully installed, proceed with installing the required Node.js dependencies for the project

```bash
npm install
```
# RabbitMQ Tutorial 

This section of the BackendMastery repository demonstrates the integration of RabbitMQ in Node.js applications, specifically focusing on user registration and email notification services.

## Overview

- `registrationServer.js`: Implements a server for user registration. When a user registers, it sends a message to a RabbitMQ queue. 
- `emailService.js`: Listens to the RabbitMQ queue and processes incoming messages to simulate sending emails.


## Running the Examples

1. **Email Service (Consumer)**
   
   Open a terminal and navigate to the RabbitMQ folder:
   ```bash
   cd RabbitMQ
   ```

   Start the email service:

   ```bash
   node emailService.js
   ```
   
This service listens to the RabbitMQ queue and will process messages representing user registrations.

2. **Registration Server (Producer)**
   
   
   Start the registration server:
   
   ```bash
   node registrationServer.js
   ```

   This server handles user registration and sends messages to the RabbitMQ queue.

3. **Testing the Workflow**
   
   
- Register a User: Send a POST request to http://localhost:3000/register with a JSON payload containing user details. You can use tools like curl or Postman for this. For example:

```bash
curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d '{"email": "user@example.com", "name": "John Doe"}'
```

- Observe Email Service Output: After sending the registration request, check the terminal running the emailService.js. You should see a log indicating that an email is being sent to the registered user's email address.

## Explanation of the Code

- registrationServer.js: This server sets up an Express application to handle HTTP POST requests for user registration. Upon receiving a registration request, it sends a message to the RabbitMQ queue with the user's details.
- emailService.js: This service continuously listens to the RabbitMQ queue. When it receives a message, it simulates sending an email by logging the action to the console.
- By running both registrationServer.js and emailService.js, you can see the asynchronous communication between two separate processes using RabbitMQ.


  
