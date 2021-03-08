FROM node:latest

WORKDIR /ndse-part-one_counter

COPY index.js ./
COPY package.json ./

RUN yarn

EXPOSE 3001 3000
CMD ["node", "index.js"]