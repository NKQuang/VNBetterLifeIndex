<?php

use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\IndicatorController;
use App\Http\Controllers\IndicatorValueController;
use App\Http\Controllers\PopulationController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\WeightController;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Route::get('/', [App\Http\Controllers\HomeController::class,'index'])->name('home');

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home.page');
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});

Route::post('/logout', [LogoutController::class, 'logout'])->name('logout');
Route::get('/charts_json', [App\Http\Controllers\UserController::class, 'charts_json'])->name('chart');
Route::group(['middleware' => 'admin'], function () {

    Route::get('/dashboard', [App\Http\Controllers\HomeController::class, 'dashboard'])->name('dashboard');
    Route::get('/users', [App\Http\Controllers\DashboardController::class, 'getAllUsers'])->name('dashboard.users');
    Route::get('/indicators', [App\Http\Controllers\DashboardController::class, 'getAllIndicators'])->name('dashboard.indicators');

    Route::get('/indicator-values', [App\Http\Controllers\DashboardController::class, 'getAllIndicatorsValue'])->name('dashboard.indicator-values');
    Route::post('/import/excel', [App\Http\Controllers\DashboardController::class, 'inportExcel'])->name('import.excel');
    Route::get('/user/{id}/edit', [App\Http\Controllers\UserController::class, 'editUser'])->name('user.edit');
    Route::get('/user/{id}/blockUser', [App\Http\Controllers\UserController::class, 'blockUser'])->name('user.blockUser');
    Route::put('/user/{id}', [App\Http\Controllers\UserController::class, 'updateUser'])->name('user.update');

    // Districts
    Route::get('/districts', [App\Http\Controllers\DashboardController::class, 'getAllDistricts'])->name('dashboard.districts');
    Route::get('/weights', [App\Http\Controllers\DashboardController::class, 'getAllWeights'])->name('dashboard.weights');
    Route::get('/populations', [App\Http\Controllers\DashboardController::class, 'getAllPopulations'])->name('dashboard.populations');

    Route::delete('/dashboard/indicator-values/{id}', [IndicatorValueController::class, 'delete'])->name('dashboard.indicator-values.delete');

    // Route để hiển thị form sửa
    Route::get('/dashboard/indicator-values/{id}/edit', [IndicatorValueController::class, 'edit'])->name('dashboard.indicator-values.edit');

    // Route để cập nhật
    Route::put('/dashboard/indicator-values/{id}', [IndicatorValueController::class, 'update'])->name('dashboard.indicator-values.update');

    Route::delete('/populations/{id}', [PopulationController::class, 'destroy'])->name('populations.destroy');
    Route::get('/populations/{id}/edit', [PopulationController::class, 'edit'])->name('populations.edit');
    Route::put('/populations/{id}', [PopulationController::class, 'update'])->name('populations.update');
    Route::get('/populations/create', [PopulationController::class, 'create'])->name('populations.create');
    Route::post('/populations/store', [PopulationController::class, 'store'])->name('populations.store');

    Route::delete('/weights/{id}', [WeightController::class, 'destroy'])->name('weights.destroy');
    Route::get('/weights/{id}/edit', [WeightController::class, 'edit'])->name('weights.edit');
    Route::put('/weights/{id}', [WeightController::class, 'update'])->name('weights.update');
    Route::get('/weights/create', [WeightController::class, 'create'])->name('weights.create');
    Route::post('/weights', [WeightController::class, 'store'])->name('weights.store');



    Route::delete('/indicators/{id}', [IndicatorController::class, 'destroy'])->name('indicators.destroy');
    Route::get('/indicators/{id}/edit', [IndicatorController::class, 'edit'])->name('indicators.edit');
    Route::put('/indicators/{id}', [IndicatorController::class, 'update'])->name('indicators.update');
    Route::get('/indicators/create', [IndicatorController::class, 'create'])->name('indicators.create');
    Route::post('/indicators/store', [IndicatorController::class, 'store'])->name('indicators.store');

    Route::get('/districts/{id}/edit', [DistrictController::class, 'edit'])->name('districts.edit');
    Route::put('/districts/{id}', [DistrictController::class, 'update'])->name('districts.update');


    Route::get('/questions', [QuestionController::class, 'index'])->name('questions.index');
    Route::delete('/questions/{id}', [QuestionController::class, 'destroy'])->name('questions.destroy');
    Route::get('/questions/{id}/edit', [QuestionController::class, 'edit'])->name('questions.edit');
    Route::put('/questions/{id}', [QuestionController::class, 'update'])->name('questions.update');

    Route::get('/questions/create', [QuestionController::class, 'create'])->name('questions.create');
    Route::post('/questions/store', [QuestionController::class, 'store'])->name('questions.store');

});
