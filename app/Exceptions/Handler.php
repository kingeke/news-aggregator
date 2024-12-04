<?php

namespace App\Exceptions;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
        });
    }

    public function render($request, Throwable $exception)
    {
        $response = parent::render($request, $exception);

        if (!session()->has('message') && $request->wantsJson()) {

            if ($exception instanceof ValidationException) {

                return response()->json([
                    'status'  => 'error',
                    'message' => 'Please review the validation errors',
                    'errors'  => $exception->validator->messages(),
                ], 422);
            }

            if ($exception instanceof ModelNotFoundException) {

                return apiMessageResponse('error', 'That resource does not exist.', 404);
            }
        }

        if ($exception instanceof ValidationException) {

            session()->flash('message', messageResponse('error', $exception->validator->messages()->first()));
        }

        if (app()->isProduction()
            && in_array($response->status(), [500, 503, 404, 403, 401])
        ) {
            return inertia('ErrorHandler', [
                'status'       => $response->status(),
                'errorMessage' => $exception->getMessage(),
            ])
                ->toResponse($request)
                ->setStatusCode($response->status());
        }

        return $response;
    }
}
