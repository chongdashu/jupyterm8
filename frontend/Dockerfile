# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set build-time environment variables
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

ARG NEXT_PUBLIC_POSTHOG_API_KEY
ENV NEXT_PUBLIC_POSTHOG_API_KEY=${NEXT_PUBLIC_POSTHOG_API_KEY}

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
