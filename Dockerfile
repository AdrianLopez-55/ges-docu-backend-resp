FROM node:18.15.0
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 4000
CMD ["yarn", "run", "start:prod"]
