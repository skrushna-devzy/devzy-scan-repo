FROM node:20

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev
COPY . .

# Intentionally missing USER directive → l3-dockerfile-user
CMD ["node", "src/server.js"]
