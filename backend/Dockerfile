FROM node:22.2.0-slim
WORKDIR /src
COPY . .

# Install the application dependencies
RUN npm ci --only=production

EXPOSE 3000

# Setup an app user so the container doesn't run as the root user
RUN useradd app
USER app

CMD ["node", "./src/server.ts"]