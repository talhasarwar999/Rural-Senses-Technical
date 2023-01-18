FROM node:10
# FROM node:10

WORKDIR /usr/src/app/api
# WORKDIR /frontend/

COPY package*.json ./
# COPY package*.json ./

RUN npm install
# RUN npm install

EXPOSE 3080
# EXPOSE 3080

CMD ["npm", "run", "dev"]
