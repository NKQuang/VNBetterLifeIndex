<?php

namespace App\Http\Controllers;

use App\Models\Indicators;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 5);

        $query = Question::query();
        $questions = $query->paginate($perPage);
        $data['title'] = "Quản lý Câu hỏi";
        return view('dashboard.question', compact('questions'),$data);
    }

    public function create()
    {
        $indicators = Indicators::all();
        $data['title'] = "Thêm mới Câu hỏi";
        return view('dashboard.create-question',compact('indicators'), $data);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'question_code' => 'required|unique:questions',
            'indicator_id' => 'required|exists:indicators,id',
        ]);

        Question::create($validated);

        return redirect()->route('questions.index')->with('success', 'Câu hỏi đã được tạo thành công!');
    }

    public function edit(Request $request)
    {
        $indicators = Indicators::all();
        $question = Question::findOrFail($request->id);
        $data['title'] = "Chỉnh sửa Câu hỏi";
        return view('dashboard.edit-question', compact('question','indicators'),$data);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'question_code' => 'required',
            'indicator_id' => 'required|exists:indicators,id',
        ]);
        $question = Question::findOrFail($request->id);
        $question->update($validated);

        return redirect()->route('questions.index')->with('success', 'Câu hỏi đã được cập nhật thành công!');
    }

    public function destroy(Request $request)
    {
        try {
            $question = Question::findOrFail($request->id);
            $question->delete();
            return redirect()->route('questions.index')->with('success', 'Câu hỏi đã được xóa thành công!');
        } catch (\Exception $e) {
            return redirect()->route('questions.index')->with('error', 'Không thể xóa câu hỏi vì có liên kết với dữ liệu khác.');
        }
    }
}
