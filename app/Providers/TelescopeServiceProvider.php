<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Laravel\Telescope\IncomingEntry;
use Laravel\Telescope\Telescope;
use Laravel\Telescope\TelescopeApplicationServiceProvider;

class TelescopeServiceProvider extends TelescopeApplicationServiceProvider
{
    /**
     * Register any application services.
     */
    public function register()
    {
        // Telescope::night();

        $this->hideSensitiveRequestDetails();

        Telescope::filter(function (IncomingEntry $entry) {

            $disabled = ['view', 'gate', 'redis'];

            if (in_array($entry->type, $disabled) && app()->isProduction()) {
                return false;
            }

            return true;
        });

        Telescope::tag(function (IncomingEntry $entry) {

            if ($entry->type == 'client_request') {

                return [explode('?', $entry->content['uri'])[0]];
            }

            if ($entry->type == 'request') {

                if (strlen($entry->content['uri']) > 100) {
                    return [$entry->content['controller_action']];
                }

                return [$entry->content['uri'], $entry->content['controller_action']];
            }

            if ($entry->type == 'cache') {
                return [$entry->content['key']];
            }

            if ($entry->type == 'command') {
                return [$entry->content['command']];
            }

            return [];
        });
    }

    /**
     * Prevent sensitive request details from being logged by Telescope.
     */
    protected function hideSensitiveRequestDetails(): void
    {
        if ($this->app->environment('local')) {
            return;
        }

        Telescope::hideRequestParameters(['_token']);

        Telescope::hideRequestHeaders([
            'cookie',
            'x-csrf-token',
            'x-xsrf-token',
        ]);
    }

    /**
     * Register the Telescope gate.
     *
     * This gate determines who can access Telescope in non-local environments.
     */
    protected function gate(): void
    {
        Gate::define('viewTelescope', function ($user) {
            return in_array($user->email, [
                
            ]);
        });
    }
}


