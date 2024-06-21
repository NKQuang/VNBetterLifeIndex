<?php

namespace App\Http\Controllers;

use App\Models\IndicatorsValue;
use Illuminate\Http\Request;

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
}
