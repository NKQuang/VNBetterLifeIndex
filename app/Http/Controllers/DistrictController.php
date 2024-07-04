<?php

namespace App\Http\Controllers;

use App\Models\Districts;
use App\Models\IndicatorsValue;
use App\Models\Question;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DistrictController extends Controller
{
    // Phương thức để hiển thị form cập nhật
    public function edit($id)
    {
        $district = Districts::find($id);
        if ($district) {
            $data['title'] = "Cập nhật quận huyện";
            return view('dashboard.edit-district', compact('district'))->with($data);
        }
        return redirect()->back()->with('error', 'Không tìm thấy quận huyện.');
    }

    public function create()
    {
        $data['title'] = "Thêm mới quận/huyện";
        return view('dashboard.create-district', $data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'full_name' => 'required',
            'full_name_en' => 'required',
            'content' => 'required',
            'regions_code' => 'required',
        ]);

        $district = new Districts($request->all());
        $district->save();

        return redirect()->route('dashboard.districts')->with('success', 'Thêm mới quận/huyện thành công');
    }
    // Phương thức để cập nhật quận huyện
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'full_name' => 'required|string|max:255',
            'full_name_en' => 'nullable|string|max:255',
            'content' => 'nullable'
        ]);

        $district = Districts::find($id);
        if ($district) {
            $district->update($validatedData);
            return redirect()->route('dashboard.districts')->with('success', 'Cập nhật quận huyện thành công.');
        }
        return redirect()->back()->with('error', 'Không tìm thấy quận huyện.');
    }

    public function getDistrictsIndicators(Request $request)
    {
        $thirtyDaysAgo = Carbon::now()->subDays(30);

        $districts = Districts::where('regions_code', 77)
            ->with(['indicatorValues' => function ($query) use ($thirtyDaysAgo) {
                $query->where('created_at', '>=', $thirtyDaysAgo);
            }])->get();

    $result = $districts->map(function ($district) use ($thirtyDaysAgo) {
            $questions = Question::with('indicator:name,id')->get();

            $questions = $questions->map(function ($question) use ($thirtyDaysAgo, $district) {
                $indicatorValue = IndicatorsValue::where('districts_id', $district->id)
                    ->where('indicators_id', $question->indicator_id) // Truy vấn bằng indicator_id thay vì question_code
                    ->where('created_at', '>=', $thirtyDaysAgo)
                    ->first();
                $question->evaluated = $indicatorValue ? true : false;
                $question->value = $indicatorValue ? $indicatorValue->value : null;
                return $question;
            });

            $district->questions = $questions;
            return $district;
        });

        return response()->json([
            'districts' => $result,
        ]);
    }

    public function getAllQuestions()
    {
        // Lấy tất cả các câu hỏi từ bảng questions
        $questions = Question::all();

        // Trả về dữ liệu dưới dạng JSON
        return response()->json($questions);
    }
    public function destroy($id)
    {
        $district = Districts::find($id);
        if ($district) {
            try {
                $district->hidden = 1;
                $district->update();
                return redirect()->route('dashboard.districts')->with('success', 'Xóa quận/huyện thành công');
            } catch (\Throwable $th) {
                return redirect()->route('dashboard.districts')->with('error', 'Không thể xóa quận/huyện đang chưa dữ liệu');
            }
        }
        return redirect()->route('dashboard.districts')->with('error', 'Không thể tìm thấy quận/huyện');
    }
}
