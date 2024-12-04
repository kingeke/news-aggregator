<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class HttpService
{
    public function default()
    {
        $client = Http::withOptions([
            'timeout'         => 60,
            'connect_timeout' => 60,
            'http_errors'     => false,
            'headers'         => [
                'accept' => 'application/json',
            ],
        ]);

        return $client;
    }

    public function downloader($path, $url)
    {
        return Http::sink($path)->get($url);
    }

    public function NewsApi($customApiKey = null)
    {
        $client = Http::withOptions([
            'base_uri'        => config('main.articles_data_sources.news_api.base_url'),
            'timeout'         => 60,
            'connect_timeout' => 60,
            'http_errors'     => false,
            'headers'         => [
                'accept'    => 'application/json',
                'X-Api-Key' => $customApiKey ?? config('main.articles_data_sources.news_api.api_key'),
            ],
        ]);

        return $client;
    }

    public function NyTimesApi($customApiKey = null)
    {
        $client = Http::withOptions([
            'base_uri'        => config('main.articles_data_sources.ny_times_api.base_url'),
            'timeout'         => 60,
            'connect_timeout' => 60,
            'http_errors'     => false,
            'headers'         => [
                'accept' => 'application/json',
            ],
        ])->withQueryParameters([
            'api-key' => $customApiKey ?? config('main.articles_data_sources.ny_times_api.api_key'),
        ]);

        return $client;
    }

    public function MediastackApi($customApiKey = null)
    {
        $client = Http::withOptions([
            'base_uri'        => config('main.articles_data_sources.mediastack_api.base_url'),
            'timeout'         => 60,
            'connect_timeout' => 60,
            'http_errors'     => false,
            'headers'         => [
                'accept' => 'application/json',
            ],
        ])->withQueryParameters([
            'access_key' => $customApiKey ?? config('main.articles_data_sources.mediastack_api.api_key'),
        ]);

        return $client;
    }
}
