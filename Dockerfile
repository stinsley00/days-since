FROM --platform=linux/amd64 node:22.6-bullseye-slim as build-step
RUN rm -rf /app/dist
RUN mkdir -p /app
ARG CONTAINER_ENVIRONMENT

WORKDIR /app
RUN apt-get update -y
RUN apt-get upgrade -y
COPY . /app
RUN npm install @angular/cli@18.0.0
RUN npm install --location=global @angular/cli@18.0.0
RUN npm install
RUN ng build 

# Stage 2
FROM nginx:latest
RUN apt-get update -y
RUN apt-get upgrade -y

# TODO: create an nginx conf for angular if necessary
COPY --from=build-step /app/dist/days-since /usr/share/nginx/html
EXPOSE 443
