<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            // Hủy tất cả token hiện tại của người dùng
            $user->tokens()->delete();

            // Tạo token mới
            $token = $user->createToken('API Token')->plainTextToken;

            return response()->json([
                'authenticated' => true,
                'api_token' => $token,
            ]);
        } else {
            return response()->json([
                'authenticated' => false,
                'message' => 'Invalid credentials',
            ], 401);
        }
    }
    public function checkLogin(Request $request)
    {
        if (Auth::check()) {
            $user = Auth::user();

            // Hủy tất cả token hiện tại của người dùng
            $user->tokens()->delete();
            // Tạo token mới
            $token = $user->createToken('API Token')->plainTextToken;

            return response()->json([
                'authenticated' => true,
                'api_token' => $token,
            ]);
        } else {
            return response()->json([
                'authenticated' => false,
            ]);
        }
    }
}

