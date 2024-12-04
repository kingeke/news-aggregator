<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Artisan;

class RunCommandAsync implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $command;
    
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($command)
    {
        $this->command = $command;
        $this->onQueue('high');
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {
            
            Artisan::call($this->command);
            
        } catch(\Exception $e) {
            
            report($e);
            
            throw $e;
        }
    }
}
