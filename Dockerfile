FROM nginx:1.25-alpine as a builder
RUN rm -rf /usr/share/nginx/html/*
COPY ./build /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/config.d/default.conf
EXPOSE 80
CMD["nginx', "-g", "daemon off;"]

