<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            Auth::loginUsingId($user->id);
            // Hủy tất cả token hiện tại của người dùng
            $user->tokens()->delete();

            // Tạo token mới
            $token = $user->createToken('auth_token')->plainTextToken;

            Cookie::queue(Cookie::make('login_token',$token, 60));
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
    public function register(Request $request)
    {

        // Validate request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email', // Email is required
            'phone' => 'required|string|max:15|unique:users,phone', // Phone is required
            'gender' => 'nullable|integer|in:0,1',
            'old' => 'nullable|string',
            'profession' => 'nullable|string|max:255',
            'relationship' => 'nullable',
            'address' => 'nullable|string',
            'password' => 'required|string|min:8|confirmed', // Ensure password confirmation
            'terms' => 'required|accepted', // Ensure terms are accepted
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'gender' => $request->gender,
            'old' => $request->old,
            'profession' => $request->profession,
            'marital_status' => $request->relationship,
            'address' => $request->address,
            'password' => Hash::make($request->password),
        ]);

        // Return the user and a success message
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
        ]);
    }
}

