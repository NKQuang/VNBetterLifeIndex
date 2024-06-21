<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Indicators;
use Illuminate\Database\QueryException;

class IndicatorController extends Controller
{

    public function create()
    {
        $data['title'] ="Thêm mới chỉ số";
        return view('dashboard.create-indicator',$data);
    }

    // Method to store new indicator
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'descriptions' => 'nullable|string|max:255',
        ]);

        $indicator = new Indicators();
        $indicator->fill($validatedData);
        $indicator->save();

        return redirect()->route('dashboard.indicators')->with('success', 'Thêm chỉ số mới thành công.');
    }
    // Method to delete an indicator
    public function destroy($id)
    {
        $indicator = Indicators::find($id);
        if ($indicator) {
            try {
                $indicator->delete();
                return redirect()->back()->with('success', 'Xóa chỉ số thành công.');
            } catch (QueryException $e) {
                if ($e->getCode() == '23000') {
                    return redirect()->back()->with('error', 'Không thể xóa chỉ số này vì nó đang được tham chiếu bởi bảng khác.');
                }
                return redirect()->back()->with('error', 'Đã xảy ra lỗi trong quá trình xóa.');
            }
        }
        return redirect()->back()->with('error', 'Không tìm thấy chỉ số.');
    }

    // Method to show edit form
    public function edit($id)
    {
        $indicator = Indicators::find($id);
        if ($indicator) {
            $data['title'] ="Chỉnh sữa chỉ số";
            return view('dashboard.edit-indicator', compact('indicator'),$data);
        }
        return redirect()->back()->with('error', 'Không tìm thấy chỉ số.');
    }

    // Method to update an indicator
    public function update(Request $request, $id)
    {
        $indicator = Indicators::find($id);
        if ($indicator) {
            $indicator->update($request->all());
            return redirect()->route('dashboard.indicators')->with('success', 'Cập nhật chỉ số thành công.');
        }
        return redirect()->back()->with('error', 'Không tìm thấy chỉ số.');
    }
}

