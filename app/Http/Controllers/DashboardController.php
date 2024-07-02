<?php

namespace App\Http\Controllers;

use App\Exports\UsersExport;
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
use Illuminate\Pagination\LengthAwarePaginator;
use Maatwebsite\Excel\Facades\Excel;

use Illuminate\Support\Collection;

class DashboardController extends Controller
{
    public function getAllUsers()
    {
        $users = User::all();
        $data["user"] = $users;
        $data["title"] = "Quản lý Người Dùng";
        return view('dashboard.users', $data);
    }
    public function getAllIndicatorsValue(Request $request)
    {
        $perPage = $request->input('per_page', 5);
        $dateFilter = $request->input('date');

        $indicator = $request->input('indicators');
        $district = $request->input('districts');
        // dd($indicator);
        $query = IndicatorsValue::query();

        if ($district) {
            $query->where('districts_id', $district);
        }
        if ($dateFilter) {
            $query->whereDate('created_at', $dateFilter);
        }

        if ($indicator) {
            $question = Question::find($indicator);
            if ($question) {
                $query->where('question_code', $question->question_code);
            }
        }

        $query = $query->where('type', 0)->paginate($perPage);

        foreach ($query as $indicatorValue) {
            $indicatorValue->question = Question::where('question_code', $indicatorValue->question_code)->first();
        }



        $districts = Districts::all();
        $indicators = Indicators::all();

        $data['indicators'] = $indicators;
        $data['indicators_value'] = $query;
        $data['districts'] = $districts;
        $data["title"] = "Quản lý giá trị chỉ số người dùng đánh giá";
        return view('dashboard.indicator-values', $data);
    }

    public function IndicatorsConst(Request $request)
    {
        $perPage = $request->input('per_page', 5);
        $indicatorFilter = $request->input('indicators');
        $districtFilter = $request->input('districts');

        $indicators = Indicators::all();
        $districts = Districts::all();
        $results = new Collection();

        foreach ($districts as $district) {
            if ($districtFilter && $district->id != $districtFilter) {
                continue;
            }

            foreach ($indicators as $indicator) {
                if ($indicatorFilter && $indicator->id != $indicatorFilter) {
                    continue;
                }

                $valuesType1 = IndicatorsValue::where('districts_id', $district->id)
                    ->where('type', 1)
                    ->whereHas('question', function ($query) use ($indicator) {
                        $query->where('indicator_id', $indicator->id);
                    })
                    ->pluck('value');

                $averageType1 = $valuesType1->average();


                $results->push((object) [
                    'districts_id' => $district->id,
                    'indicator_id' => $indicator->id,
                    'indicator_name' => $indicator->name,
                    'district_name' => $district->name,
                    'average_value' => $averageType1
                ]);
            }
        }
        // Tạo collection và phân trang kết quả
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $items = $results->slice(($currentPage - 1) * $perPage, $perPage)->values();
        $paginatedResults = new LengthAwarePaginator($items, $results->count(), $perPage, $currentPage, [
            'path' => LengthAwarePaginator::resolveCurrentPath(),
            'query' => $request->query(),
        ]);

        $data['districts'] = $districts;
        $data['indicators'] = $indicators;
        $data['results'] = $paginatedResults;


        $data['title'] = "Quản lý chỉ số mặc định";

        return view('dashboard.indicators-const', $data);
    }

    public function getAllIndicators()
    {
        $indicators = Indicators::all();
        $data['indicators'] = $indicators;
        $data["title"] = "Quản lý  chỉ số";
        return view('dashboard.indicators', $data);
    }
    public function getAllPopulations()
    {
        $populations = Populations::with('district')->paginate(9);
        $data['populations'] = $populations;
        $data["title"] = "Quản lý dân số";
        return view('dashboard.populations', $data);
    }
    public function getAllWeights()
    {
        $datalist = Weights::all();

        $data['weight'] = $datalist;
        $data["title"] = "Quản lý trọng số";
        return view('dashboard.weights', $data);
    }

    function inportExcel(Request $request)
    {
        $request->validate([
            'excel_file' => 'required|file',
        ]);

        // Retrieve the file from the request
        $excelFile = $request->file('excel_file');
        $delete = IndicatorsValue::where('type', 1);
        $delete->delete();
        // Import the file using Maatwebsite Excel
        Excel::import(new IndicatorsImport, $excelFile);

        // Redirect back or to another page with a success message
        return back()->with('success', 'Dữ liệu đã được tải lên thành công.');
    }

    public function export(Request $request)
    {
        $gender = $request->gender;
        $user_type = $request->user_type;
        $marital_status = $request->marital_status;
        $profession = $request->profession;
        $old = $request->old;

        return Excel::download(new UsersExport($gender, $user_type, $marital_status, $profession, $old), 'users.xlsx');
    }

    function getAllDistricts()
    {
        $data["title"] = "Quản lý Quận/Huyện";
        $data['districts'] = Districts::paginate(8);
        return view('dashboard.districts', $data);
    }
}
