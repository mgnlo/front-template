# 第一階段產生dist資料夾
FROM node:16-alpine as build-stage

# 指定預設/工作資料夾
WORKDIR /usr/app

# 只copy package.json檔案
COPY ./package*.json ./
# 安裝dependencies
RUN npm install -legacy-peer-deps

# copy其餘目錄及檔案
COPY ./ ./

# 指定建立build output資料夾，--prod為Production Mode
RUN npm run build-ocp --output-path=./dist/Console-Frontend


# pull nginx image
FROM nginx:1.24.0-alpine-slim

RUN chgrp -R 0 /etc/nginx/ /var/cache/nginx /var/run /var/log/nginx  && \ 
  chmod -R g+rwX /etc/nginx/ /var/cache/nginx /var/run /var/log/nginx

# 從第一階段的檔案copy
COPY --from=build-stage /usr/app/dist/Console-Frontend /usr/share/nginx/html

# 覆蓋image裡的設定檔
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf