<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class NewsApiService
{
    public $httpService;

    public function __construct()
    {
        $this->httpService = new HttpService();
    }

    public function getAllSources()
    {
        return Cache::remember('news-api-sources', config('main.ttl'), function () {

            return collect($this->httpService->NewsApi()->get("top-headlines/sources", [
                'language' => "en",
            ])->collect()['sources'] ?? []);
        });
    }

    public function getLatestNews()
    {
        return Cache::remember('news-api-latest-news', config('main.one_hr_ttl'), function () {

            return $this->httpService->NewsApi()->get("top-headlines", [
                'language' => "en",
            ])->collect();
        });
    }

    public function confirmApiKey($key)
    {
        try {

            $response = $this->httpService->NewsApi($key)->get("top-headlines/sources", [
                'language' => "en",
            ]);

            if ($response->getStatusCode() != 200) {

                return [
                    'status'  => false,
                    'message' => "Invalid API Key passed for News API Service",
                ];
            }

            return [
                'status' => true,
            ];

        } catch (\Exception $e) {

            report($e);

            return [
                'status'  => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function serializeData($data)
    {
        if (strtolower(($data['title'] ?? null)) == "[removed]") {

            return [
                'status'  => false,
                'message' => "Data removed",
            ];
        }

        $sources = $this->getAllSources();

        $category = null;

        if (isset($data['source']['id'])) {

            $category = $sources->where('id', ($data['source']['id']))->first()['category'] ?? null;

            if ($category) {

                $category = ucwords($category);
            }
        }

        $response = [
            'status' => true,
            'data'   => [
                'uuid'         => $data['uuid'],
                'title'        => $data['title'] ?? null,
                'description'  => $data['description'] ?? null,
                'content'      => $data['content'] ?? null,
                'author'       => $data['author'] ?? null,
                'source'       => $data['source']['id'] ?? null,
                'api_source'   => config('main.articles_data_sources.news_api.label'),
                'url'          => $data['url'] ?? null,
                'image_url'    => $data['urlToImage'] ?? null,
                'category'     => $category,
                'published_at' => ($data['publishedAt'] ?? null) ? now()->parse($data['publishedAt'])->toDateTimeString() : null,
            ],
        ];

        return $response;
    }

}
