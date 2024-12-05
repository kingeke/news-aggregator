FROM php:8.3-fpm

#Update Ubuntu software
RUN apt-get update && \
    apt-get -y install sudo

#Install nginx
RUN apt install -y nginx

#Install PHP extensions

RUN apt-get install wget -y \
    && apt-get install zlib1g-dev -y \
    && apt-get install procps -y \
    && apt-get install build-essential -y \
    && apt-get install zlib1g-dev -y \
    && apt-get install libcurl4-openssl-dev -y \
    && apt-get install bzip2 -y \
    && apt-get install libbz2-dev -y \
    && apt-get install libxml2-dev -y \
    && apt-get install libpng-dev -y \
    && apt-get install nano -y \
    && apt-get install -y libmcrypt-dev \
    && apt-get install -y libzip-dev \
    && apt-get install -y libonig-dev \
    && /usr/local/bin/docker-php-ext-install gd pdo pdo_mysql curl xml zip soap mbstring 

#install composer

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer

#Install supervisor  and configure supervisor
RUN apt-get update && apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
RUN mkdir -p /var/log/php-fpm
COPY /container/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

#install node
RUN apt install -y curl
ENV NODE_VERSION=21.5.0
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.40.1/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"


#install cron
RUN apt-get update && \
    apt-get install cron -y

# create directory
RUN mkdir /var/www/html/laravel

# copy only composer files first to cache docker build
COPY composer.json /var/www/html/laravel/.
COPY package.json /var/www/html/laravel/.

# Run npm install
RUN cd /var/www/html/laravel && npm install

# Run composer update
RUN cd /var/www/html/laravel && composer update --no-scripts --no-autoloader

#copy application

COPY . /var/www/html/laravel/.
COPY /.env.docker /var/www/html/laravel/.env

RUN cd /var/www/html/laravel && composer dump-autoload --optimize

# Run npm run build
RUN cd /var/www/html/laravel && npm run build

# Generate app key
RUN cd /var/www/html/laravel && php artisan key:generate

#Create docker user

RUN usermod -u 1000 www-data && groupmod -g 1000 www-data

COPY /container/nginx /etc/nginx/sites-available/default

#Change storage permission
RUN cd  /var/www/html/laravel/ && chown -R www-data:www-data storage/
RUN cd  /var/www/html/laravel/ && chown -R www-data:www-data public/
RUN cd  /var/www/html/laravel/ && chown -R www-data:www-data .env

#configure php.ini for production
COPY /container/php.ini /usr/local/etc/php/
COPY /container/www.conf /usr/local/etc/php-fpm.d/

#Add startup script

COPY /container/entrypoint.sh /var
RUN tr -d "\r" < /var/entrypoint.sh > /var/migration.sh
RUN chmod +x /var/migration.sh

COPY /container/cronjob.sh /var
RUN tr -d "\r" < /var/cronjob.sh > /var/scheduler.sh
RUN chmod +x /var/scheduler.sh
RUN touch /var/log/cron.log
RUN chmod 777 /var/log/cron.log

EXPOSE 80

ENTRYPOINT ["sh", "/var/migration.sh"]