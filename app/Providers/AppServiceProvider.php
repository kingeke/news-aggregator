<?php

namespace App\Providers;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        Schema::defaultStringLength(191);
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

                Artisan::call("migrate");

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
