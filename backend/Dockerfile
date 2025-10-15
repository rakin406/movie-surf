FROM node:22.2.0-slim

WORKDIR /app
COPY ./backend .

RUN npm install 

EXPOSE 3000

CMD ["npm", "run", "dev"]
