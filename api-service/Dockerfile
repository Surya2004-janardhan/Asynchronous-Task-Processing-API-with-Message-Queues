# Dockerfile - API Service
# 
# This file will:
# 1. Use an official Node.js runtime as the base image.
# 2. Set the working directory inside the container.
# 3. Copy package.json and package-lock.json to install dependencies.
# 4. Copy the application source code.
# 5. Expose port 8000 for the Express server.
# 6. Define the command to start the API (e.g., node src/main.js).

# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the API application source code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Start the API process
CMD ["node", "src/main.js"]
