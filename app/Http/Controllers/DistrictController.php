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
    ->with(['indicatorValues' => function($query) use ($thirtyDaysAgo) {
        $query->where('created_at', '>=', $thirtyDaysAgo);
    }])->get();

        $result = $districts->map(function ($district) use ($thirtyDaysAgo) {
            $questions = Question::with('indicator:name,id')->get();


            $questions = $questions->map(function ($question) use ( $thirtyDaysAgo, $district) {
                $indicatorValue = IndicatorsValue::where('districts_id', $district->id)
                                                ->where('question_code', $question->question_code)
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
}
