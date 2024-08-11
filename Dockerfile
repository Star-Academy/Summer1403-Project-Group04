FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm install -g @angular/cli@18.1.4

# TODO: Use cache

COPY . .

RUN npm run build --configuration=production


FROM nginx:1.27

RUN groupadd -g 10001 appuser && \
    useradd -u 10001 -g appuser -m appuser  

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build --chown=appuser:appuser /app/dist/book-store/browser /usr/share/nginx/html

USER appuser
