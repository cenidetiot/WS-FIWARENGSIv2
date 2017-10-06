# Create image based on the official Node 8 image from dockerhub
FROM node:8

# Create a directory where our app will be placed
RUN mkdir -p /wsfiwarengsi

# Change directory so that our commands run inside this new directory
WORKDIR /wsfiwarengsi

# Get all the code needed to run the app and the dependency definitions
COPY . /wsfiwarengsi

# Install dependecies
RUN npm i

# Expose the port the app runs in
EXPOSE 8000

# Serve the app
CMD ["npm", "start"]