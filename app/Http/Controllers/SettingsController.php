<?php

namespace App\Http\Controllers;

use App\Jobs\RunCommandAsync;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class SettingsController extends Controller
{
    public function runScrapper()
    {
        Artisan::call("news:scrapper");

        return back()->with('message', messageResponse('success', "News Scrapper ran successfully"));
    }
    
    public function setupArticleSources()
    {
        $articleSources = collect(config('main.articles_data_sources'))->values()->sortBy('label')->values();

        $data = [
            'articleSources' => $articleSources,
        ];

        return inertia("Settings/SetupArticleSources", $data);
    }

    public function storeArticleSources(Request $request)
    {
        $request->validate([
            'articleSources' => 'required|array|min:1',
            'apiKeys'        => 'required|array|min:1',
        ]);

        try {

            if (collect($request->articleSources)->count() > collect($request->apiKeys)->count()) {

                return back()->with('message', messageResponse('error', "Please ensure all API keys are inputted"));
            }

            $sources = collect(config('main.articles_data_sources'));

            $validated = [];

            //validate API keys before storing
            foreach ($request->articleSources as $articleSource) {

                $source = $sources->firstWhere('value', $articleSource);

                if (!$source) {

                    throw new \Exception("Data not found for $articleSource");
                }

                $apiKey = $request->apiKeys[$source['env_key']];

                if (!$apiKey) {

                    throw new \Exception("API key not found for $articleSource");
                }

                $service = $source['service_name'];

                $service = app("App\Services\\$service");

                $response = $service->confirmApiKey($apiKey);

                if (!($response['status'] ?? null)) {

                    throw new \Exception($response['message'] ?? "An error occurred confirming your API key, please try again");
                }

                $validated = collect($validated)->merge([
                    $source['env_key'] => $apiKey,
                ]);
            }

            foreach ($validated as $envKey => $value) {

                file_put_contents(base_path('.env'), "\n$envKey=\"$value\"\n", FILE_APPEND);
            }

            //dispatch news scrapper in the background
            RunCommandAsync::dispatch("news:scrapper");

            RunCommandAsync::dispatch("db:seed --force");

            return redirect()->route('register')->with('message', messageResponse('success', "API Keys successfully updated"));

        } catch (\Exception $e) {

            report($e);

            return back()->with('message', messageResponse('error', "An error occurred: {$e->getMessage()}"));
        }
    }
}
