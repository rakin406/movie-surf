FROM node:22.2.0-slim

WORKDIR /app
COPY ../tsconfig.base.json ./tsconfig.base.json
COPY ./backend .

RUN npm install 

EXPOSE 3000

CMD ["npm", "run", "dev"]
