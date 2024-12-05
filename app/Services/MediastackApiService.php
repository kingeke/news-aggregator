<?php

namespace App\Services;

use Illuminate\Support\Str;

class MediastackApiService
{
    public $httpService;

    public function __construct()
    {
        $this->httpService = new HttpService();
    }

    public function getLatestNews()
    {
        return $this->httpService->MediastackApi()->get("news", [
            'limit'     => 100,
            'sort'      => 'published_desc',
            'languages' => 'en',
        ])->collect();
    }

    public function confirmApiKey($key)
    {
        try {

            $response = $this->httpService->MediastackApi($key)->get("sources", [
                'search' => 'news',
                'limit'  => 1,
            ]);

            if ($response->getStatusCode() != 200) {

                return [
                    'status'  => false,
                    'message' => "Invalid API Key passed for Mediastack API Service",
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
        $author = $data['author'] ?? null;

        if ($author) {

            $author = trim($author);

            $author = Str::replace("-", "", $author);

            $author = $author == "" ? null : $author;
        }

        $response = [
            'status' => true,
            'data'   => [
                'uuid'         => $data['uuid'],
                'title'        => $data['title'] ?? null,
                'description'  => $data['description'] ?? null,
                'content'      => $data['content'] ?? null,
                'author'       => $author,
                'source'       => $data['source'] ?? null,
                'api_source'   => config('main.articles_data_sources.mediastack_api.label'),
                'url'          => $data['url'] ?? null,
                'image_url'    => $data['image'] ?? null,
                'category'     => $data['category'] ?? null ? ucwords($data['category']) : null,
                'published_at' => ($data['published_at'] ?? null) ? now()->parse($data['published_at'])->toDateTimeString() : null,
            ],
        ];

        return $response;
    }
}
