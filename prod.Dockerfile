# build environment
FROM node:12

ENV INSTALL_PATH /nh5050
RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
