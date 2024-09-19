# frontend/Dockerfile

# Build Stage
FROM node:18 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Build the app
RUN npm run build

# Production Stage
FROM nginx:stable-alpine

# Copy the build output to nginx html directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
