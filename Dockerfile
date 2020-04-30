FROM nginx:1.17-alpine

COPY .docker/ /

RUN rm -rf /usr/share/nginx/html/*

COPY ./dist/deck-ui /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
