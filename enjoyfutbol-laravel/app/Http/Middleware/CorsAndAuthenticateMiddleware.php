<?php

namespace App\Http\Middleware;

use Closure;
use Fruitcake\Cors\HandleCors as BaseHandleCors;
use Illuminate\Auth\Middleware\Authenticate as BaseAuthenticate;
use Illuminate\Http\Request;

class CorsAndAuthenticateMiddleware
{
    /**
     * The base CORS handler.
     *
     * @var \Fruitcake\Cors\HandleCors
     */
    protected $baseCorsHandler;

    /**
     * Create a new middleware instance.
     *
     * @param  \Fruitcake\Cors\HandleCors  $baseCorsHandler
     * @return void
     */
    public function __construct(BaseHandleCors $baseCorsHandler)
    {
        $this->baseCorsHandler = $baseCorsHandler;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Handle CORS requests
        $response = $this->baseCorsHandler->handle($request, function ($request) use ($next) {
            return $next($request);
        });

        // Check if the request is unauthenticated and not a preflight OPTIONS request
        if (! $request->user() && ! $this->isPreflightRequest($request)) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }

        return $response;
    }

    /**
     * Determine if the request is a preflight OPTIONS request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function isPreflightRequest(Request $request)
    {
        return $request->isMethod('OPTIONS');
    }
}
