FROM node:22.2.0-slim
WORKDIR /src

# Install the application dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy in the source code
COPY src ./src
EXPOSE 3000

# Setup an app user so the container doesn't run as the root user
RUN useradd app
USER app

CMD ["node", "src/server.ts"]