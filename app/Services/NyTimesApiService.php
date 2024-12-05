<?php

namespace App\Services;

use Illuminate\Support\Str;

class NyTimesApiService
{
    public $httpService;

    public function __construct()
    {
        $this->httpService = new HttpService();
    }

    public function getLatestNews()
    {
        return $this->httpService->NyTimesApi()->get("svc/news/v3/content/all/all.json")->collect();
    }

    public function confirmApiKey($key)
    {
        try {

            $response = $this->httpService->NyTimesApi($key)->get("svc/news/v3/content/section-list.json");

            if ($response->getStatusCode() != 200) {

                return [
                    'status'  => false,
                    'message' => "Invalid API Key passed for NY Times API Service",
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
        $imageUrl = (collect(($data['multimedia'] ?? []))->where('format', 'mediumThreeByTwo440')->first()['url'] ?? null);

        if (!$imageUrl) {

            $imageUrl = (collect(($data['multimedia'] ?? []))->where('subtype', 'xlarge')->first()['url'] ?? null);

            if ($imageUrl) {

                $imageUrl = "https://nytimes.com/$imageUrl";
            }
        }

        if (!$imageUrl) {

            $imageUrl = (collect(($data['multimedia'] ?? []))->where('format', 'normal')->first()['url'] ?? null);
        }

        $category = $data['subSection'] ?? $data['subsection_name'] ?? $data['section'] ?? $data['section_name'];

        $published_at = ($data['published_date'] ?? null) ? now()->parse($data['published_date'])->toDateTimeString() : null;

        if (!$published_at) {

            $published_at = ($data['pub_date'] ?? null) ? now()->parse($data['pub_date'])->toDateTimeString() : null;
        }

        $author = $data['author'] ?? null;

        if (!$author && isset($data['byline'])) {

            $author = gettype(($data['byline'])) == 'string' ? $data['byline'] : ($data['byline']['original'] ?? null);
        }

        if ($author) {

            $author = Str::replace("By ", "", $author);

            $author = trim($author) == "" ? null : $author;
        }

        $response = [
            'status' => true,
            'data'   => [
                'uuid'         => $data['uuid'],
                'title'        => $data['title'] ?? $data['headline']['main'] ?? null,
                'description'  => $data['abstract'] ?? null,
                'content'      => $data['content'] ?? $data['lead_paragraph'] ?? null,
                'author'       => $author,
                'source'       => $data['source'] ?? null,
                'api_source'   => config('main.articles_data_sources.ny_times_api.label'),
                'url'          => $data['url'] ?? $data['web_url'] ?? null,
                'image_url'    => $imageUrl,
                'category'     => $category,
                'published_at' => $published_at,
            ],
        ];

        return $response;
    }
}
