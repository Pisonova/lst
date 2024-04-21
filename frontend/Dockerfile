FROM node:21-bullseye as build

RUN mkdir -p /opt/frontend

WORKDIR /opt/frontend

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:1.25-bookworm

COPY --from=build /opt/frontend/build /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
