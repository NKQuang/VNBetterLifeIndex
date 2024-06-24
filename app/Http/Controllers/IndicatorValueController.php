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
        'questions_id' => 'required|array',
        'questions_id.*' => 'required|exists:questions,id',
        'question_code' => 'required|array',
        'question_code.*' => 'required|exists:questions,question_code',
        'value' => 'required|array',
        'value.*' => 'required|numeric',
        'name' => 'required|array',
        'name.*' => 'required|string|max:255',
    ]);

    $questionsId = $request->input('questions_id');
    $questionCodes = $request->input('question_code');
    $values = $request->input('value');
    $names = $request->input('name');

    foreach ($questionsId as $index => $questionId) {
        $questionCode = $questionCodes[$index];
        $value = $values[$index];
        $name = $names[$index];

        // Check if question_code matches questions_id
        $question = Question::where('id', $questionId)
                            ->where('question_code', $questionCode)
                            ->first();
        if (!$question) {
            return response()->json(['error' => 'Invalid question_code for the provided questions_id'], 422);
        }

        // Create a new indicator value
        $indicatorValue = new IndicatorsValue();
        $indicatorValue->districts_id = $request->districts_id;
        $indicatorValue->question_code = $questionCode;
        $indicatorValue->value = $value;
        $indicatorValue->name = $name;
        $indicatorValue->user_id = $user->id;
        $indicatorValue->type = 0;
        $indicatorValue->save();
    }

    return response()->json([
        'message' => 'Indicator values submitted successfully'
    ]);
}

}
