<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function scopeFilter($builder, $filter = null)
    {
        if ($filter) {

            if ($filter->keyword) {

                $builder->where(function ($q) use ($filter) {
                    $q->where('title', "like", "%$filter->keyword%")
                        ->orWhere('description', "like", "%$filter->keyword%")
                        ->orWhere('content', "like", "%$filter->keyword%");
                });
            }

            if ($filter->sources) {

                $builder->where(function($q) use($filter) {

                    $q->whereIn('source', explode(',', $filter->sources))
                    ->orWhereIn('api_source', explode(',', $filter->sources));
                });
            }

            if ($filter->categories) {

                $builder->whereIn('category', explode(',', $filter->categories));
            }

            if ($filter->authors) {

                $builder->where('author', "REGEXP", implode("|", (explode(',', $filter->authors))));
            }

            if ($filter->from) {

                $builder->where('published_at', '>=', $filter->from);
            }

            if ($filter->to) {

                $builder->where('published_at', '<=', $filter->to);
            }
        }
    }
}
