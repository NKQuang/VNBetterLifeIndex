<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

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
                'user' => $user
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
        $encryptedToken = $request->cookie('login_token');


        if (!$encryptedToken) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }

        try {
            // Giải mã giá trị của cookie
            $decodedToken = Crypt::decryptString($encryptedToken);

            // Tách chuỗi thành mảng bằng dấu '|'
            $parts = explode('|', $decodedToken);

            // Lấy phần tử thứ hai (chỉ số 1) trong mảng
            $number = $parts[1];
            $userId = DB::table('personal_access_tokens')->where('id',$number)->first();
            //list($token, $userId) = explode('|', $decodedToken);
        } catch (\Exception $e) {
            return response()->json(['error' => 'encryptedToken Fail'], 401);
        }

        // Tìm người dùng dựa trên user_id được lưu trong cookie
        $user = User::find($userId->tokenable_id);
        if ($user) {
            $user->tokens()->delete();
            $token = $user->createToken('API Token')->plainTextToken;
            return response()->json([
                'authenticated' => true,
                'api_token' => $token,
                'user' =>$user
            ]);
        } else {
            return response()->json([
                'authenticated' => false,
            ]);
        }
    }
    public function logout(Request $request)
    {
        // Xóa token hiện tại của người dùng
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Đăng xuất thành công'], 200);
    }
}

