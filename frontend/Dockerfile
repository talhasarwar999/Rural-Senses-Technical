
# pull official base image
FROM node:18.3.0-alpine
# set working directory
WORKDIR /frontend
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install app dependenciesdocker container ps
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent
# add app
COPY . ./
# start app
CMD ["npm", "start"]