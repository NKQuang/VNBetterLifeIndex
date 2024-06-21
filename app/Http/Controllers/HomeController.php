<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return view('client.chartbanner');
    }

    public function dashboard()
    {
        $data["title"] = "Tổng quan";
        return view('dashboard.layout', $data);
    }
}
