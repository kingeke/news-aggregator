<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Services\ArticleService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public $articleService;

    public function __construct()
    {
        $this->articleService = new ArticleService();
    }

    public function index(Request $request)
    {
        $user = auth()->user();
        $from = $request->from ? now()->parse($request->from)->startOfDay() : now()->subWeek(1)->startOfDay();
        $to   = $request->to ? now()->parse($request->to)->endOfDay() : now()->endOfDay();

        if (count($request->query()) == 0) {

            $request->merge([
                'categories' => $request->categories ?? implode(",", ($user->preferred_categories ?? [])),
                'sources'    => $request->sources ?? implode(",", ($user->preferred_sources ?? [])),
                'authors'    => $request->authors ?? implode(",", $user->preferred_authors ?? []),
            ]);
        }

        $request->merge([
            'from' => $from,
            'to'   => $to,
        ]);

        $articles = Article::latest('published_at')->filter($request);

        $data = [
            'articles'   => (clone $articles)->paginate(40),
            'categories' => $this->articleService->categories(),
            'authors'    => $this->articleService->authors(),
            'sources'    => $this->articleService->sources(),
        ];

        return inertia("Dashboard/Index", $data);
    }
}
