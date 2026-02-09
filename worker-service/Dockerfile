# Dockerfile - Worker Service
# 
# This file will:
# 1. Use an official Node.js runtime as the base image.
# 2. Set the working directory inside the container.
# 3. Copy package.json and install dependencies.
# 4. Copy the worker application source code.
# 5. Define the command to start the worker process (node src/main.js).
# 6. Ensure the worker can connect to RabbitMQ and MySQL via environmental variables.

# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the worker application source code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Start the worker process
CMD ["node", "src/main.js"]
