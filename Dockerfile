FROM node:16.18.0 As building
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build

FROM node:16.18.0-alpine as production
WORKDIR /usr/src/app
COPY --from=building /usr/src/app/package*.json ./
RUN npm install --only=prod
COPY --from=building /usr/src/app ./
CMD ["npm", "run", "start:prod"]