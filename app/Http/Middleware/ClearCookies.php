<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClearCookies
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Check if the user is being logged out
        if (!Auth::check()) {
            // Clear specific cookies
            $response->headers->clearCookie('login_token');
            // Add more cookies if needed
        }

        return $response;
    }
}
