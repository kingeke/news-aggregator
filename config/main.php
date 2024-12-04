<?php

return [

    'ttl'                   => env("TTL", 86400),

    'one_hr_ttl'            => env("ONE_HR_TTL", 3600),

    'articles_data_sources' => [
        'news_api'       => [
            'value'        => 'news_api',
            'label'        => "News API",
            'base_url'     => env("NEWS_API_BASE_URL", "https://newsapi.org/v2/"),
            'env_key'      => 'NEWS_API_KEY',
            'api_key'      => env("NEWS_API_KEY"),
            'sign_up_page' => env("NEWS_API_SIGN_UP_PAGE", "https://newsapi.org/register"),
            'service_name' => 'NewsApiService',
            'valueKey'     => 'articles',
        ],
        'ny_times_api'   => [
            'value'        => 'ny_times_api',
            'label'        => "New York Times API",
            'base_url'     => env("NY_TIMES_API_BASE_URL", "https://api.nytimes.com/"),
            'api_key'      => env("NY_TIMES_API_KEY"),
            'env_key'      => "NY_TIMES_API_KEY",
            'sign_up_page' => env("NY_TIMES_SIGN_UP_PAGE", "https://developer.nytimes.com/accounts/create"),
            'service_name' => 'NyTimesApiService',
            'valueKey'     => 'results',
        ],
        'mediastack_api' => [
            'value'        => 'mediastack_api',
            'label'        => "Mediastack API",
            'base_url'     => env("MEDIA_STACK_API_BASE_URL", "http://api.mediastack.com/v1/"),
            'api_key'      => env("MEDIA_STACK_API_KEY"),
            'env_key'      => "MEDIA_STACK_API_KEY",
            'sign_up_page' => env("MEDIA_STACK_SIGN_UP_PAGE", "https://mediastack.com/signup"),
            'service_name' => 'MediaStackApiService',
            'valueKey'     => 'data',
        ],
    ],
];
