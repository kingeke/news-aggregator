<?php

namespace App\Services;

use App\Models\Article;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class ArticleService
{
    public $ttl;

    public function __construct()
    {
        $this->ttl = config('main.ttl');
    }

    public function checkIfArticleExists($uuid)
    {
        return Article::where('uuid', $uuid)->exists();
    }

    public function storeArticle($data)
    {
        return Article::firstOrCreate([
            'uuid' => $data['uuid'],
        ], $data);
    }

    public function categories()
    {
        return Cache::remember('articleCategories', $this->ttl, function () {

            return collect(Article::select('category')->whereNotNull('category')->distinct('category')->pluck('category'))->map(function ($item) {
                return [
                    'value' => $item,
                    'label' => ucfirst($item),
                ];
            })->sortBy('label')->values();

        });
    }

    public function authors()
    {
        return Cache::remember('articleAuthors', $this->ttl, function () {

            return collect(Article::select('author')
                    ->whereNotNull('author')
                    ->where('author', '!=', "")
                    ->distinct('author')
                    ->pluck('author'))
                ->flatMap(function ($item) {

                    $normalized = str_replace(' and ', ',', $item);

                    return array_map('trim', explode(',', $normalized));
                })
                ->map(function ($item) {
                    return [
                        'value' => $item,
                        'label' => ucfirst($item),
                    ];
                })
                ->sortBy('label')
                ->unique('value')
                ->values();

        });
    }

    public function sources()
    {
        return Cache::remember('articleSources', $this->ttl, function () {

            $sources = Article::select('source')->whereNotNull('source')->distinct('source')->pluck('source');

            $apiSource = Article::select('api_source')->whereNotNull('api_source')->distinct('api_source')->pluck('api_source');

            return collect($sources)->merge($apiSource)->map(function ($item) {
                return [
                    'value' => $item,
                    'label' => ucwords(Str::replace("-", " ", $item)),
                ];
            })->sortBy('label')->values();
        });
    }
}
