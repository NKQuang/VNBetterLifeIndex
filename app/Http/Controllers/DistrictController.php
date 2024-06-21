<?php

namespace App\Http\Controllers;

use App\Models\Districts;
use Illuminate\Http\Request;

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
        ]);

        $district = Districts::find($id);
        if ($district) {
            $district->update($validatedData);
            return redirect()->route('dashboard.districts')->with('success', 'Cập nhật quận huyện thành công.');
        }
        return redirect()->back()->with('error', 'Không tìm thấy quận huyện.');
    }
}
