<?php

use App\Http\Controllers\WbiController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json([
        'user' => $request->user(),
        'teams' => $request->user()->allTeams(),
        'currentTeam' => $request->user()->currentTeam,
    ]);
});
Route::get('/wbi', [WbiController::class, 'calculateWbi']);
