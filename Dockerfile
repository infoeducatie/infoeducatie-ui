FROM node:16-bullseye

RUN apt-get update -y && \
    apt-get install --no-install-recommends -y nginx && \
    apt-get clean

EXPOSE 80

ADD nginx.conf /etc/nginx/sites-enabled/default

RUN mkdir -p /data
WORKDIR /data

ADD package.json /data
RUN npm install

ARG APP_ENV=production
ARG NODE_ENV=production

ADD . /data
RUN npm run build

RUN mv /data/build/ /www && rm -rf /data
WORKDIR /www

CMD ["nginx", "-g", "daemon off;"]
