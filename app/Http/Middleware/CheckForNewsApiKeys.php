<?php

namespace App\Http\Middleware;

use App\Jobs\RunCommandAsync;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckForNewsApiKeys
{
    /**
     * This method checks to ensure API keys are stored in env, we only update env if app is local
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $keys = collect(config('main.articles_data_sources'))->whereNotNull('api_key')->count();

        if (in_array($request->route()->getName(), [
            'settings.setup_article_sources',
            'settings.store_article_sources',
        ]) && $keys > 0) {

            //dispatch news scrapper in the background
            if (app()->isLocal()) {

                RunCommandAsync::dispatch("db:seed --force");
            }

            RunCommandAsync::dispatch("news:scrapper");

            return redirect()->route('register')->with('message', messageResponse('success', "API Keys successfully updated"));
        }

        if ($keys == 0) {

            if (app()->isProduction()) {

                throw new \Exception("No news API keys found in .env file, please update.");
            }

            if (!in_array($request->route()->getName(), [
                'settings.setup_article_sources',
                'settings.store_article_sources',
            ])) {

                return redirect()->route('settings.setup_article_sources');
            }
        }

        return $next($request);
    }
}
