FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm install -g @angular/cli@18.1.4

RUN apt-get update && apt-get install -y \
    wget \
    gnupg2 \
    && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*  

ENV CHROME_BIN="/usr/bin/google-chrome"

# TODO: Use cache

COPY . .

RUN npm run lint

RUN ng test --watch=false --browsers=ChromeHeadlessNoSandbox  

RUN npm run build --configuration=production


FROM nginx:1.27

# RUN groupadd -g 10001 appuser && \
#     useradd -u 10001 -g appuser -m appuser  

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/group4-front/browser /usr/share/nginx/html/
# COPY --from=build --chown=appuser:appuser /app/dist/group4-front/browser /usr/share/nginx/html

# USER appuser
