<?php

use App\Http\Controllers\WbiController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\IndicatorValueController;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/wbi', [WbiController::class, 'calculateWbi']);
Route::middleware('auth:sanctum')->get('/check-login', [AuthController::class, 'checkLogin']);
Route::middleware('auth:sanctum')->get('/districts-indicators', [DistrictController::class, 'getDistrictsIndicators']);
Route::middleware('auth:sanctum')->post('/submit-indicator-value', [IndicatorValueController::class, 'store']);
