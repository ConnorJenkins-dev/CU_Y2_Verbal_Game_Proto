FROM node:25-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY src ./src
COPY dist ./dist

EXPOSE 3000

CMD ["npm", "run", "dev:backend"]