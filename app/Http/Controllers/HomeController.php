<?php

namespace App\Http\Controllers;

use App\Models\Indicators;
use App\Models\IndicatorsValue;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return view('client.chartbanner');
    }

    public function dashboard()
    {
        $usersCount = User::all()->count();
        $indicators = Indicators::all()->count();
        $indicatorValue = IndicatorsValue::where('type',0)->count();
        $data["indicatorValue"] = $indicatorValue;
        $data["usersCount"] = $usersCount;
        $data["indicators"] = $indicators;



        $data["title"] = "Tổng quan";
        return view('dashboard.dashboard', $data);
    }
}
