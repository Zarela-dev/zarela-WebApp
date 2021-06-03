# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
RUN apk update && apk add git
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf