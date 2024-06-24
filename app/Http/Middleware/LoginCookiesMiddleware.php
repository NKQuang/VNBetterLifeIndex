<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

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
        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (auth()->check()) {
            // Đặt cookies đăng nhập
            cookie()->queue(cookie('login_token', auth()->user()->id, 60));
        }

        return $next($request);
    }
}
