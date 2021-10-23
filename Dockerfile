FROM node:alpine

# create & set working directory
WORKDIR /app

# copy source files
COPY . /app/

# install dependencies
RUN npm ci

# start app
RUN npm run build
EXPOSE 3000
CMD npm run start