<?php

namespace Database\Seeders;

use App\Jobs\ImportNewsArticle;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Bus;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (config('main.articles_data_sources.ny_times_api.api_key')) {

            $data = collect(json_decode(file_get_contents(base_path('archivedData.json')), true));

            $jobs = [];

            foreach ($data as $article) {

                $jobs[] = new ImportNewsArticle($article, config('main.articles_data_sources.ny_times_api.label'));
            }

            if (count($jobs) > 0) {

                Bus::batch($jobs)->name("NY Times Archive Import Job")->allowFailures()->dispatch();
            }
        }
    }
}
