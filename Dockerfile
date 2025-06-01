# Use Node base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first to install deps
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy everything else (will be overridden by volume during dev)
COPY . .

# Expose default Vite port
EXPOSE 5173

# Start dev server
CMD ["npm", "run", "dev", "--", "--host"]
