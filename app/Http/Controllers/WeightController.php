<?php

namespace App\Http\Controllers;

use App\Models\Indicators;
use App\Models\Weights;
use Illuminate\Http\Request;

class WeightController extends Controller
{

    public function destroy($id)
    {
        $weight = Weights::find($id);
        if ($weight) {
            $weight->delete();
            return redirect()->back()->with('success', 'Xóa thành công');
        }
        return redirect()->back()->with('error', 'Không tìm thấy dữ liệu để xóa');
    }

    public function edit()
    {

        $weight = Weights::all();
        $indicators = Indicators::all();
        if ($weight) {
            $data['title'] = "Chỉnh sữa trọng số";
            return view('dashboard.edit-weights', compact('weight', 'indicators'),$data);
        }
        return redirect()->back()->with('error', 'Không tìm thấy dữ liệu để cập nhật');


    }
    public function update(Request $request)
    {
        // Validate the input
        $request->validate([
            'id.*' => 'required|exists:weights,id',
            'name.*' => 'required|string|max:255',
            'value.*' => ['required', 'regex:/^\d+(\.\d+)?%$/'],
            'indicators_id.*' => 'required|exists:indicators,id',
        ]);

        // Retrieve the weights from the request
        $ids = $request->input('id');
        $names = $request->input('name');
        $values = $request->input('value');
        $indicators_ids = $request->input('indicators_id');

        // Convert value percentages to numbers and calculate the total
        $totalValue = 0;
        foreach ($values as $value) {
            $number = floatval(rtrim($value, '%'));
            $totalValue += $number;
        }

        // Check if total value exceeds 100%
        if ($totalValue > 100) {
            return redirect()->back()->withErrors(['value' => 'Tổng giá trị không được vượt quá 100%'])->withInput();
        }

        // Update weights
        foreach ($ids as $index => $id) {
            $weight = Weights::findOrFail($id);
            $weight->name = $names[$index];
            $weight->value = $values[$index];
            $weight->indicators_id = $indicators_ids[$index];
            $weight->save();
        }

        // Redirect or return response
        return redirect()->route('dashboard.weights')->with('success', 'Cập nhật trọng số thành công');
    }

    public function create()
    {
        $data['title'] ="Thêm mới trọng số";
        $indicators = Indicators::all();
        return view('dashboard.create-weights',compact('indicators'),$data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'value' => 'required|regex:/^\d+(\.\d+)?%$/',
            'indicators_id' => 'required|exists:indicators,id',
        ]);

        $weight = new Weights();
        $weight->name = $request->name;
        $weight->value = $request->value;
        $weight->indicators_id = $request->indicators_id;
        $weight->save();;

        return redirect()->route('dashboard.weights')->with('success', 'Tạo mới thành công');
    }
}
