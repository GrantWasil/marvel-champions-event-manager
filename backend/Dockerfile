# backend/Dockerfile

# Use Node.js LTS version
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Bundle app source
COPY . .

# Expose port
EXPOSE 5000

# Start the server
CMD [ "node", "server.js" ]
