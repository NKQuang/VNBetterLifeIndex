<?php

use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\IndicatorController;
use App\Http\Controllers\IndicatorsValueController;
use App\Http\Controllers\IndicatorValueController;
use App\Http\Controllers\PopulationController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WeightController;
use App\Models\IndicatorsValue;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Jetstream\Http\Controllers\Livewire\UserProfileController;

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
    Route::get('/historyProfile',[UserController::class,'historyProfile'])->name('history.profile');
    Route::put('/reviews/{id}', [IndicatorValueController::class, 'updateOfUser'])->name('reviews.update');
});
//Route::middleware('logincookies')->get('/user/profile');
Route::get('/user/profile', [UserProfileController::class, 'show'])->name('profile.show');
Route::post('/logout', [LogoutController::class, 'logout'])->name('custom.logout');
Route::get('/charts_json', [App\Http\Controllers\UserController::class, 'charts_json'])->name('chart');
Route::group(['middleware' => 'admin'], function () {

    Route::get('/dashboard', [App\Http\Controllers\HomeController::class, 'dashboard'])->name('dashboard');
    Route::get('/users', [App\Http\Controllers\DashboardController::class, 'getAllUsers'])->name('dashboard.users');
    Route::get('/indicators', [App\Http\Controllers\DashboardController::class, 'getAllIndicators'])->name('dashboard.indicators');

    Route::get('/indicator-values', [App\Http\Controllers\DashboardController::class, 'getAllIndicatorsValue'])->name('dashboard.indicator-values');
    Route::get('/indicator-value-admin', [App\Http\Controllers\DashboardController::class, 'IndicatorsConst'])->name('dashboard.indicator-value-admin');
   /// Route::get('/indicators-value-admin/details/{id}', [App\Http\Controllers\IndicatorValueController::class, 'IndicatorsConstDetail'])->name('indicators.details');
    Route::get('/indicators-detail/{id}/{district_id}', [App\Http\Controllers\IndicatorValueController::class, 'IndicatorsConstDitrictDetail'])->name('indicators.details.district');
    Route::get('/delete/indicator-values/{type}',[App\Http\Controllers\IndicatorValueController::class,'deleteIndicatorsForType'])->name('delete.indicators');


    Route::post('/import/excel', [App\Http\Controllers\DashboardController::class, 'inportExcel'])->name('import.excel');
    Route::post('/users/export', [App\Http\Controllers\DashboardController::class, 'export']);

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


    Route::delete('/weights/{id}', [WeightController::class, 'destroy'])->name('weights.destroy');
    Route::get('/weights/edit', [WeightController::class, 'edit'])->name('weights.edit');
    Route::put('/weights/update', [WeightController::class, 'update'])->name('weights.update');
    Route::get('/weights/create', [WeightController::class, 'create'])->name('weights.create');
    Route::post('/weights', [WeightController::class, 'store'])->name('weights.store');



    Route::delete('/indicators/{id}', [IndicatorController::class, 'destroy'])->name('indicators.destroy');
    Route::get('/indicators/{id}/edit', [IndicatorController::class, 'edit'])->name('indicators.edit');
    Route::put('/indicators/{id}', [IndicatorController::class, 'update'])->name('indicators.update');
    Route::get('/indicators/create', [IndicatorController::class, 'create'])->name('indicators.create');
    Route::post('/indicators/store', [IndicatorController::class, 'store'])->name('indicators.store');

    Route::get('/districts/{id}/edit', [DistrictController::class, 'edit'])->name('districts.edit');
    Route::put('/districts/{id}', [DistrictController::class, 'update'])->name('districts.update');

    Route::get('/districts/create', [DistrictController::class, 'create'])->name('districts.create');
    Route::post('/districts', [DistrictController::class, 'store'])->name('districts.store');
    Route::delete('/districts/{id}', [DistrictController::class, 'destroy'])->name('districts.destroy');

    Route::get('/questions', [QuestionController::class, 'index'])->name('questions.index');
    Route::delete('/questions/{id}', [QuestionController::class, 'destroy'])->name('questions.destroy');
    Route::get('/questions/{id}/edit', [QuestionController::class, 'edit'])->name('questions.edit');
    Route::put('/questions/{id}', [QuestionController::class, 'update'])->name('questions.update');

    Route::get('/questions/create', [QuestionController::class, 'create'])->name('questions.create');
    Route::post('/questions/store', [QuestionController::class, 'store'])->name('questions.store');

    Route::delete('/indicator-value-admin/{id}',[IndicatorValueController::class,'delete'])->name('indicators.value.destroy');
    Route::get('/indicator-value-admin/{id}/edit', [IndicatorValueController::class, 'edit'])->name('indicators.value.edit');

});

