FROM node:20-slim AS base

ENV NODE_ENV=production
WORKDIR /app

COPY server/package*.json ./
RUN npm install --omit=dev

COPY server/src ./src

EXPOSE 8080

CMD ["npm", "start"]



