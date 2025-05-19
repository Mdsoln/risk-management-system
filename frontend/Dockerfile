# Use official Node.js image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source and build it
COPY . .
RUN npm run build

# --------- Use a minimal image for production ---------
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app ./

# Expose port 3000
EXPOSE 3000

# Start Next.js in production mode and bind to 0.0.0.0 for Docker
CMD ["npx", "next", "start", "-p", "3000", "-H", "0.0.0.0"]
