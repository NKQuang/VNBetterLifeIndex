<?php

namespace App\Http\Controllers;

use App\Models\Indicators;
use App\Models\IndicatorsValue;
use App\Models\Question;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IndicatorValueController extends Controller
{
    public function delete($id)
    {
        $indicatorValue = IndicatorsValue::findOrFail($id);
        $indicatorValue->delete();

        return redirect()->route('dashboard.indicator-values')->with('success', 'Đã xóa thành công.');
    }

    public function edit($id)
    {
        $indicatorValue = IndicatorsValue::findOrFail($id);
        $data['title'] = "Chỉnh sữa giá trị chỉ số";
        return view('dashboard.edit-indicator-value', compact('indicatorValue'), $data);
    }

    public function update(Request $request, $id)
    {
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

        // Validate request data
        $request->validate([
            'user_id' => 'nullable|sometimes',
            'districts_id' => 'required|exists:districts,id',
            'questions_id' => 'required|array',
            'questions_id.*' => 'required|exists:questions,id',
            'question_code' => 'required|array',
            'question_code.*' => 'required|exists:questions,question_code',
            'value' => 'required|array',
            'value.*' => 'required|numeric',
            'indicator_id' => 'required|exists:indicators,id',
            'full_name' => 'nullable|string|max:255',
            'gender' => 'nullable|integer|in:0,1',
            'phone_number' => 'nullable|string|max:15',
            'old' => 'nullable|string|in:0-15,15-25,25-35,35-45,45-55,55-65,>65',
            'profession' => 'nullable|string|max:255',
            'relationship' => 'nullable',
        ]);
        // Lấy user_id từ request
        $userId = $request->input('user_id');

        $user = null;

        // Nếu user_id được cung cấp, tìm người dùng tương ứng
        if ($userId) {
            $user = User::find($userId);
            if (!$user) {
                return response()->json(['error' => 'Invalid user_id'], 422);
            }
        }

        $questionsId = $request->input('questions_id');
        $questionCodes = $request->input('question_code');
        $values = $request->input('value');
        $indicatorId = $request->input('indicator_id');

        // Get the name from the Indicator table using the indicator_id
        $indicator = Indicators::find($indicatorId);
        if (!$indicator) {
            return response()->json(['error' => 'Invalid indicator_id'], 422);
        }
        $name = $indicator->name;

        foreach ($questionsId as $index => $questionId) {
            $questionCode = $questionCodes[$index];
            $value = $values[$index];

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

            $indicatorValue->full_name = $request->full_name;
            $indicatorValue->gender = $request->gender;
            $indicatorValue->phone_number = $request->phone_number;
            $indicatorValue->old = $request->old;
            $indicatorValue->profession = $request->profession;
            $indicatorValue->marital_status = $request->relationship;
            if ($user) {
                $indicatorValue->user_id = $user->id;
            }

            $indicatorValue->type = 0;
            $indicatorValue->save();
        }

        return response()->json([
            'message' => 'Indicator values submitted successfully'
        ]);
    }
}
