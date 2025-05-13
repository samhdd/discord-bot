# Use an official Node.js runtime as a parent image
# Choose a specific version and consider using Alpine for smaller images
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) first
# This leverages Docker's caching. If these files don't change,
# subsequent `npm install` won't run unless necessary.
COPY package*.json ./

# Install app dependencies
# Use `npm ci` for cleaner, reproducible builds in CI/CD environments
# Or `npm install --only=production` if you don't need devDependencies in the final image
RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["sh", "-c", "node deploy-commands.js && node index.js" ]

# Optional: For better security, run the application as a non-root user.
# Create a non-root user and group first (often 'node' user already exists in official images)
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# USER appuser