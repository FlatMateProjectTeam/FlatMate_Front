ARG ARCH=linux/amd64
FROM --platform=$ARCH node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_BASE
ENV VITE_API_BASE=${VITE_API_BASE}
RUN npm run build

FROM --platform=$ARCH nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist ./
RUN printf '%s\n' \
  'server {' \
  '  listen 8080;' \
  '  server_name _;' \
  '  root /usr/share/nginx/html;' \
  '  index index.html;' \
  '  location / {' \
  '    try_files $uri /index.html;' \
  '  }' \
  '  location /assets/ {' \
  '    access_log off;' \
  '    expires 7d;' \
  '  }' \
  '}' > /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
