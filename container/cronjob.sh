#!/bin/bash
while true; do
    cd /var/www/html/laravel && php artisan schedule:run >> /var/log/cron.log
    sleep 60
done