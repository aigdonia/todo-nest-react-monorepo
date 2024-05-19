# Multiphase to utilize caching of the very costy steps
# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml files
COPY package.json ./

# Install dependencies
RUN npm install

# now the runner
FROM node:20-alpine

# Expose the port the app runs on
EXPOSE 4001

# Copy the rest of the application code
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Define the command to run the application
CMD ["npm", "start:prod"]
