FROM node:20 AS build

RUN groupadd -g 1001 appuser && \
    useradd -u 1001 -g appuser -m appuser

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm install -g @angular/cli@18.1.4

COPY . .

RUN npm run build --configuration=production

FROM nginx:1.21

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/demo/browser /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]  
