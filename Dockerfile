# base image
FROM node:9.6.1

#COPY set working directory
RUN mkdir -p /app
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json ./
RUN npm install
RUN npm install react-scripts@2.1.5 -g
COPY . ./

# start app
ADD run.sh /
CMD /run.sh
