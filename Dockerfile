FROM ubuntu
RUN export http_proxy=http://192.168.10.11:8118
RUN apt-get clean
RUN apt-get update
RUN apt-get install
RUN apt-get install -y software-properties-common
RUN apt-get updateRUN apt-get -f install -y nodejs nginx npm curl unzip
WORKDIR /client
ADD package.json .
ADD ./src ./src
ADD ./public ./public
ADD .webpackrc .webpackrc
ADD default /etc/nginx/sites-available
RUN npm install
RUN npm run build
CMD ["nginx", "-g", "daemon off"]
EXPOSE 80