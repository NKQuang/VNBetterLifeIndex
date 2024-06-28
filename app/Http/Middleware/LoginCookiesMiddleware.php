<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class LoginCookiesMiddleware
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
        $authorizationHeader = $request->header('Authorization');
        if ($authorizationHeader) {
            $token = str_replace('Bearer ', '', $authorizationHeader);
            $personalAccessToken = PersonalAccessToken::findToken($token);
            if ($personalAccessToken) {
                // Lấy tokenable_id từ token
                $tokenable_id = $personalAccessToken->tokenable_id;

                // Tìm người dùng dựa trên tokenable_id
                $user = User::find($tokenable_id);
                if (!Auth::check()) {
                    Auth::loginUsingId($user->id);
                }
                return $next($request);
            } else {
                return redirect('/');
            }
        }
        if (Auth::check()) {
            return $next($request);
        }
        else{
            return redirect('/login');
        }

    }
}
