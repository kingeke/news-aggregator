<?php

namespace App\Jobs;

use App\Services\ArticleService;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ImportNewsArticle implements ShouldQueue
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $data, $source, $articleService;

    /**
     * Create a new job instance.
     */
    public function __construct($data, $source)
    {
        $this->data           = $data;
        $this->source         = $source;
        $this->articleService = new ArticleService();
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {

            $source = $this->source;
            $data   = $this->data;

            $config = collect(config('main.articles_data_sources'))->firstWhere('label', $source);

            if (!$config) {

                info("No config data found for $source");

                return;
            }

            $uuid = generateUuid(
                $data['title'] ?? $data['headline']['main'] ?? null,
                ($data['publishedAt'] ?? $data['published_at'] ?? $data['published_date'] ?? $data['pub_date'])
            );

            if (!$uuid) {

                info("No UUID generated for article", $data);

                return;
            }

            $data = collect($data)->merge([
                'uuid' => $uuid,
            ]);

            if ($this->articleService->checkIfArticleExists($uuid)) {

                info("Article already exists for UUID $uuid", collect($data)->toArray());

                return;
            }

            $config = collect(config('main.articles_data_sources'))->firstWhere('label', $source);

            $service = $config['service_name'];

            $service = app("App\Services\\$service");

            $response = $service->serializeData($data);

            if (!$response['status']) {

                $errorMessage = $response['message'] ?? null;

                info("Error occurred getting response for UUID $uuid $errorMessage", collect($data)->toArray());

                return;
            }

            $this->articleService->storeArticle($response['data']);

        } catch (\Exception $e) {

            report($e);

            throw $e;
        }
    }
}
