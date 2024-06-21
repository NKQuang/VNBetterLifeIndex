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

    public function edit($id)
    {

        $weight = Weights::find($id);
        $indicators = Indicators::all();
        if ($weight) {
            $data['title'] = "Chỉnh sữa trọng số";
            return view('dashboard.edit-weights', compact('weight', 'indicators'),$data);
        }
        return redirect()->back()->with('error', 'Không tìm thấy dữ liệu để cập nhật');


    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'value' => 'required|regex:/^\d+(\.\d+)?%$/',
            'indicators_id' => 'required|exists:indicators,id',
        ]);

        $weight = Weights::find($id);
        if ($weight) {
            $weight->name = $request->name;
            $weight->value = $request->value;
            $weight->indicators_id = $request->indicators_id;
            $weight->save();
            return redirect()->route('dashboard.weights')->with('success', 'Cập nhật thành công');
        }
        return redirect()->back()->with('error', 'Không tìm thấy dữ liệu để cập nhật');
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
