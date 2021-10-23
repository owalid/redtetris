FROM node:latest
WORKDIR /app
COPY . .
RUN npm install -g npm@latest
RUN npm install
RUN npm install nodemon
