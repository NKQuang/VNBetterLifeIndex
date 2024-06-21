<?php

namespace App\Http\Controllers;

use App\Models\Districts;
use App\Models\Populations;
use Illuminate\Http\Request;

class PopulationController extends Controller
{
    public function destroy($id)
    {
        $population = Populations::find($id);
        if ($population) {
            $population->delete();
            return redirect()->back()->with('success', 'Xóa thành công');
        }
        return redirect()->back()->with('error', 'Không tìm thấy dữ liệu để xóa');
    }
    public function edit($id)
    {
        $population = Populations::find($id);
        if ($population) {
            $data['title'] = "Chỉnh sữa dân số";
            return view('dashboard.edit-population', compact('population'), $data);
        }
        return redirect()->back()->with('error', 'Không tìm thấy dữ liệu để cập nhật');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'value' => 'required|numeric',
        ]);

        $population = Populations::find($id);
        if ($population) {
            $population->value = $request->value;
            $population->save();
            return redirect()->route('dashboard.populations')->with('success', 'Cập nhật thành công');
        }
        return redirect()->back()->with('error', 'Không tìm thấy dữ liệu để cập nhật');
    }
    public function create()
    {
        $districts = Districts::all();
        $data['title'] ="Thêm mới dân số";
        return view('dashboard.create-population',compact('districts'),$data);
    }

    public function store(Request $request)
    {
        $request->validate([
            'value' => 'required|numeric',
            'district_id' => 'required|exists:districts,id',
        ]);

        $population = new Populations();
        $population->value = $request->input('value');
        $population->districts_id = $request->input('district_id');
        $population->save();

        return redirect()->route('dashboard.populations')->with('success', 'Tạo mới thành công');
    }

}
