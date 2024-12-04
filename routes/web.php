<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'setup-article-sources'], function () {

    Route::get("/", "SettingsController@setupArticleSources")->name("settings.setup_article_sources");

    Route::post("/", "SettingsController@storeArticleSources")->name("settings.store_article_sources");
});

Route::group(['middleware' => 'auth'], function () {

    Route::get("/", "DashboardController@index")->name('dashboard');

    Route::group(['prefix' => 'profile'], function () {
        
        Route::get('/', "ProfileController@edit")->name('profile.edit');

        Route::put('/', "ProfileController@update")->name('profile.update');

    });
});

require __DIR__ . '/auth.php';
