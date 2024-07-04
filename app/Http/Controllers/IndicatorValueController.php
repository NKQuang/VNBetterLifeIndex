<?php

namespace App\Http\Controllers;

use App\Models\Districts;
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

        return redirect()->back()->with('success', 'Đã xóa thành công.');
    }

    public function edit($id)
    {
        $indicatorValue = IndicatorsValue::findOrFail($id);
        $districts = Districts::all();
        $indicator = Indicators::all();
        $data['title'] = "Chỉnh sữa giá trị chỉ số";
        return view('dashboard.edit-indicator-value', compact('indicatorValue','districts','indicator'), $data);
    }

    public function create()
    {
        $districts = Districts::all(); // Lấy tất cả các quận từ cơ sở dữ liệu
        $indicators = Indicators::all();
        $data['title'] = "Tạo mới chỉ số mặc định";
        return view('dashboard.create-indicator-value', compact('districts','indicators'),$data);
    }
    public function store(Request $request)
    {
        $request->validate([
            'value' => 'required|numeric',
            'district_id' => 'required',
            'indicator_id' => 'required', // Thêm xác thực cho indicator_id
            // Các quy tắc xác thực khác nếu cần
        ]);
        try {
            $name = Indicators::find($request->input('indicator_id'))->name;
            $indicatorValue = new IndicatorsValue();
            $indicatorValue->name = $name;
            $indicatorValue->value = $request->input('value');
            $indicatorValue->districts_id = $request->input('district_id');
            $indicatorValue->indicators_id = $request->input('indicator_id');
            $indicatorValue->type = 1;// Lưu indicator_id
            // Lưu indicator_id
            $indicatorValue->save();
            return redirect()->route('dashboard.indicator-value-admin')->with('success', 'Tạo mới giá trị thành công');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Có lỗi xảy ra vui lòng thử lại');

        }
        return redirect()->back()->with('success', 'Tạo mới giá trị thành công');
    }


    public function update(Request $request, $id)
    {
        $indicatorValue = IndicatorsValue::findOrFail($id);

        $request->validate([
            'value' => 'required|numeric',
        ]);

        $indicatorValue->update($request->all());

        return redirect()->route('dashboard.indicator-value-admin')->with('success', 'Cập nhật thành công.');
    }
    public function storeapi(Request $request)
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
            'old' => 'nullable|string',
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
        } else {
            $user = User::create([
                'name' => $request->full_name,
                'gender' => $request->gender,
                'phone' => $request->phone_number,
                'old' => $request->old,
                'profession' => $request->profession,
                'marital_status' => $request->relationship,
                'status' => 99,
                'email' => null,
                'password' => null,
                'role' => 'anonymous'
            ]);
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


    function IndicatorsConstDetail(Request $request, $id)
    {

        $perPage = $request->input('per_page', 5);

        $districtFilter = $request->input('districts');

        $indicator = Indicators::findOrFail($id);

        $indicatorValuesQuery = IndicatorsValue::whereHas('question', function ($query) use ($id) {
            $query->where('indicator_id', $id);
        });
        // Lấy danh sách các huyện và câu hỏi liên quan
        $districts = Districts::whereIn('id', $indicatorValuesQuery->pluck('districts_id'))->get();
        $questions = Question::where('indicator_id', $id)->get();
        if ($districtFilter) {
            $indicatorValuesQuery->where('districts_id', $districtFilter);
        }

        $indicatorValues = $indicatorValuesQuery->where('type',1)->paginate($perPage);



        $data['title'] = "Dữ liệu chi tiết chỉ số";
        return view('dashboard.indicator-detail', compact('indicatorValues', 'districts', 'indicator', 'questions'), $data);
    }
    function IndicatorsConstDitrictDetail(Request $request, $id,$district_id)
    {

        $perPage = $request->input('per_page', 5);
        $indicator = Indicators::findOrFail($id);

        $indicatorValuesQuery = IndicatorsValue::whereHas('question', function ($query) use ($id) {
            $query->where('indicator_id', $id);
        });
        // Lấy danh sách các huyện và câu hỏi liên quan

        $districts = Districts::where('id', $district_id)->get();
        $questions = Question::where('indicator_id', $id)->get();
        if ($district_id) {
            $indicatorValuesQuery->where('districts_id', $district_id);
        }

        $indicatorValues = $indicatorValuesQuery->where('type',1)->paginate($perPage);

        $data['title'] = "Dữ liệu chi tiết chỉ số ". $districts[0]->full_name;
        return view('dashboard.indicator-detail-district', compact('indicatorValues','districts' ,'indicator', 'questions'), $data);
    }
    function deleteIndicatorsForType($type = 0) {
        IndicatorsValue::where('type', $type)->delete();
        return redirect()->route('dashboard.indicator-values')->with('success', 'Đã xóa thành công.');
    }

    public function updateOfUser(Request $request, $id)
    {
        $indicatorValue = IndicatorsValue::findOrFail($id);

        $request->validate([
            'value' => 'required|numeric',
        ]);

        $indicatorValue->update($request->all());

        return redirect()->back()->with('success', 'Cập nhật thành công.');
    }
}
