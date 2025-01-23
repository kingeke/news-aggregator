<?php

namespace App\Providers;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (isVercel()) {

            \Illuminate\Support\Facades\URL::forceScheme('https');

            $dbPath = env('DB_DATABASE', database_path('database.sqlite'));

            if (!File::exists($dbPath)) {

                File::put($dbPath, '');

                Artisan::call("migrate:fresh");

                Artisan::call("db:seed");
            }
        }

        \Illuminate\Database\Query\Builder::macro('toRawSql', function () {
            return vsprintf(str_replace(['?'], ['\'%s\''], $this->toSql()), $this->getBindings());
        });

        \Illuminate\Database\Eloquent\Builder::macro('toRawSql', function () {
            return ($this->getQuery()->toRawSql());
        });
    }
}
