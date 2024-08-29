# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the current directory contents into the container at /app
COPY . .

# Build the app
RUN npm run build

# Start the app
CMD ["npm", "start"]
