# Use an official Node.js runtime as a parent image
FROM node:23 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use an official Nginx image to serve the Angular app
FROM nginx:alpine

# Copy the built Angular app from the previous stage
COPY --from=build /app/dist/lgc.frontend/browser /usr/share/nginx/html

# Copy the environment configuration file
COPY src/env.js /usr/share/nginx/html/env.js

# Replace the placeholder in env.js with the actual value
RUN sed -i 's|http://localhost:8080/api|http://localhost/api|g' /usr/share/nginx/html/env.js

# Copy custom Nginx configuration file
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
