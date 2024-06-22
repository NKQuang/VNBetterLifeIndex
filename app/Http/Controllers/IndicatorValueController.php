<?php

namespace App\Http\Controllers;

use App\Models\IndicatorsValue;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IndicatorValueController extends Controller
{
    public function delete($id) {
        $indicatorValue = IndicatorsValue::findOrFail($id);
        $indicatorValue->delete();

        return redirect()->route('dashboard.indicator-values')->with('success', 'Đã xóa thành công.');
    }

    public function edit($id) {
        $indicatorValue = IndicatorsValue::findOrFail($id);
        $data['title'] ="Chỉnh sữa giá trị chỉ số";
        return view('dashboard.edit-indicator-value', compact('indicatorValue'),$data);
    }

    public function update(Request $request, $id) {
        $indicatorValue = IndicatorsValue::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'value' => 'required|numeric',
            'question' => 'nullable|string',
            'created_at' => 'required|date',
        ]);

        $indicatorValue->update($request->all());

        return redirect()->route('dashboard.indicator-values')->with('success', 'Cập nhật thành công.');
    }
    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['authenticated' => false]);
        }

        // Validate request data
        $request->validate([
            'districts_id' => 'required|exists:districts,id',
            'questions_id' => 'required|exists:questions,id',
            'question_code' => 'required|exists:questions,question_code',
            'value' => 'required|numeric',
            'name' => 'required|string|max:255',
        ]);

        // Check if question_code matches questions_id
        $question = Question::where('id', $request->questions_id)
                            ->where('question_code', $request->question_code)
                            ->first();
        if (!$question) {
            return response()->json(['error' => 'Invalid question_code for the provided questions_id'], 422);
        }

        // Create a new indicator value
        $indicatorValue = new IndicatorsValue();
        $indicatorValue->districts_id = $request->districts_id;
        $indicatorValue->question_code = $request->question_code;
        $indicatorValue->value = $request->value;
        $indicatorValue->name = $request->name;
        $indicatorValue->user_id = $user->id;
        $indicatorValue->type = 0;
        $indicatorValue->save();

        return response()->json([
            'message' => 'Indicator value submitted successfully'
        ]);
    }
}
