FROM node:22.2.0-slim

WORKDIR /app
COPY . .

RUN npm install 

EXPOSE 5173

CMD ["npm", "run", "dev"]
