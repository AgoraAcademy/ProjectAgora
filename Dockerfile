FROM ubuntu
RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak
ADD sources.list /etc/apt
RUN apt-get clean
RUN apt-get update
RUN apt-get install
RUN apt-get install -y software-properties-common
RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
RUN apt-get -f install -y nodejs nginx npm curl unzip
ADD default /etc/nginx/sites-available
EXPOSE 80