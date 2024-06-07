# Use an official node image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Install a lightweight web server to serve the built application
RUN npm install -g serve

# Set the command to run the web server and serve the application
CMD ["serve", "-s", "dist"]

# Expose port 3000 to be accessible from outside the container
EXPOSE 3000
