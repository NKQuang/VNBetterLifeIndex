<?php

namespace App\Http\Controllers;

use App\Imports\IndicatorsImport;
use App\Models\Districts;
use App\Models\Indicators;
use App\Models\IndicatorsValue;
use App\Models\Populations;
use App\Models\Question;
use App\Models\User;
use App\Models\Weight;
use App\Models\Weights;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class DashboardController extends Controller
{
    public function getAllUsers()
    {
        $users = User::all();
        $data["user"] = $users;
        $data["title"] ="Quản lý Người Dùng";
        return view('dashboard.users',$data);
    }
    public function getAllIndicatorsValue(Request $request)
{
    $query = IndicatorsValue::paginate(7);

    foreach ($query as $indicatorValue) {
        $indicatorValue->question = Question::where('question_code', $indicatorValue->question_code)->first();
    }

    $data['indicators_value'] = $query;
    $data["title"] = "Quản lý giá trị chỉ số";
    return view('dashboard.indicator-values', $data);
}



    public function getAllIndicators() {
        $indicators = Indicators::paginate(9);
        $data['indicators'] = $indicators;
        $data["title"] ="Quản lý  chỉ số";
        return view('dashboard.indicators',$data);
    }
    public function getAllPopulations() {
        $populations = Populations::with('district')->paginate(9);
        $data['populations'] = $populations;
        $data["title"] ="Quản lý dân số";
        return view('dashboard.populations',$data);
    }
    public function getAllWeights() {
        $datalist = Weights::paginate(7);
        $data['weight'] = $datalist;
        $data["title"] ="Quản lý trọng số";
        return view('dashboard.weights',$data);
    }

    function inportExcel(Request $request) {
        $request->validate([
            'excel_file' => 'required|file',
        ]);

        // Retrieve the file from the request
        $excelFile = $request->file('excel_file');

        // Import the file using Maatwebsite Excel
        Excel::import(new IndicatorsImport, $excelFile);

        // Redirect back or to another page with a success message
        return back()->with('success', 'Dữ liệu đã được tải lên thành công.');

    }
    function getAllDistricts() {
        $data["title"] ="Quản lý Quận/Huyện";
        $data['districts'] = Districts::paginate(8);
        return view('dashboard.districts',$data);
    }
}
