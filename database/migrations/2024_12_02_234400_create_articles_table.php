<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->string('title')->index();
            $table->text('description')->nullable();
            $table->text('content')->nullable();
            $table->string('author')->index()->nullable();
            $table->string('source')->index()->nullable();
            $table->string('api_source')->index();
            $table->longText('url')->nullable();
            $table->longText('image_url')->nullable();
            $table->string('category')->index()->nullable();
            $table->dateTime('published_at')->index()->nullable();
            $table->timestamps();

            $table->fullText('description');
            $table->fullText('content');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
