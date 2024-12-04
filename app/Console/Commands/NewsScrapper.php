<?php

namespace App\Console\Commands;

use App\Jobs\ImportNewsArticle;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Cache;

class NewsScrapper extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:scrapper';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scrape news sources and store in database';

    /**
     * Execute the console command.
     */
    public function handle()
    {

        try {

            $sources = config("main.articles_data_sources");

            foreach ($sources as $key => $source) {

                $config = $sources[$key] ?? null;

                if (!$config) {

                    continue;
                }

                if (!($config['api_key'] ?? null)) {

                    $this->logMessage("No API Key found for {$config['label']} Service");

                    continue;
                }

                $service = $config['service_name'];

                $service = app("App\Services\\$service");

                $this->logMessage("Source is {$config['label']}");

                $jobs = [];

                $data = collect(($service->getLatestNews()[$source['valueKey']] ?? []));

                $this->logMessage("Got about {$data->count()} {$config['label']} Data");

                $data->each(function ($data) use (&$jobs, $config) {

                    $jobs[] = new ImportNewsArticle($data, $config['label']);
                });

                if (count($jobs) > 0) {

                    Bus::batch($jobs)->name("{$config['label']} Import Job")->allowFailures()->dispatch();
                }
            }

            //forget some cache keys to get updated data
            Cache::deleteMultiple([
                "articleSources",
                "articleCategories",
                "articleAuthors",
            ]);

        } catch (\Exception $e) {

            $this->logMessage($e->getMessage());

            report($e);

            throw $e;
        }
    }

    public function logMessage($message, $data = [])
    {
        $this->info($message);

        info($message, collect($data)->toArray());
    }
}
