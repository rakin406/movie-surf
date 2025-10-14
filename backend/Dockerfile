FROM node:22.2.0-slim
WORKDIR /src
COPY . .

# Install the application dependencies
# RUN npm ci --only=production
RUN npm install --production=false

EXPOSE 3000

# Setup an app user so the container doesn't run as the root user
RUN useradd app
USER app

CMD ["npm", "run", "start"]
