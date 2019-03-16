FROM ubuntu
RUN apt-get clean
RUN apt-get update
RUN apt-get install
RUN apt-get install -y software-properties-common
RUN apt-get updateRUN apt-get -f install -y nodejs nginx npm curl unzip
ADD default /etc/nginx/sites-available
RUN npm install
RUN npm run build
CMD ["nginx", "-g", "daemon off"]
EXPOSE 80