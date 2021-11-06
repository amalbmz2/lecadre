FROM node:14.14.0-alpine

WORKDIR /app

COPY package*.json ./ 

# RUN apt-get install build-essential
RUN yarn install 

COPY . . 

CMD ["yarn", "run","build"]
CMD ["yarn","start"]