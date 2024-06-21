<?php

namespace App\Http\Controllers;

use App\Models\Districts;
use App\Models\IndicatorsValue;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function editUser($id)
    {
        $user = User::findOrFail($id);
        $data['title'] = 'Chỉnh sửa người dùng';
        $data['user'] = $user;
        $data['districts'] = Districts::all();
        return view('dashboard.editUser', $data);
    }
    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        if (!$user) {
            return redirect()->route('dashboard.users')->with('error', 'Có lỗi xảy ra vui lòng thử lại.');
        }
        // Define validation rules
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'phone' => 'required|numeric|digits:10',
            'regions' => 'required|string|max:255',
            'districts' => 'required|numeric',
            'address' => 'required|string|max:255',
            'file-upload' => 'nullable|file|mimes:jpg,jpeg,png,gif|max:2048', // Assuming you want to allow image uploads
        ];

        // Custom validation messages (optional)
        $messages = [
            'name.required' => 'Trường tên là bắt buộc.',
            'email.required' => 'Trường email là bắt buộc.',
            'email.email' => 'Email phải là địa chỉ email hợp lệ.',
            'email.unique' => 'Email đã được sử dụng.',
            'phone.required' => 'Trường điện thoại là bắt buộc.',
            'phone.numeric' => 'Số điện thoại phải là số.',
            'phone.digits' => 'Điện thoại phải có 10 chữ số.',
            // Add other custom messages as needed
        ];

        // Perform validation
        $validatedData = $request->validate($rules, $messages);

        // Proceed with the update operation using $validatedData
        $user = User::findOrFail($id);
        try {
            $user->update($validatedData);
            $user->save();
        } catch (\Throwable $th) {
            return redirect()->route('dashboard.users')->with('error', 'Có lỗi xảy ra vui lòng thử lại.' . $th);
        }

        // Redirect or return response after successful update
        return redirect()->route('dashboard.users')->with('success', 'Cập nhật thông tin người dùng thành công.');
    }
    public function blockUser($id)
    {
        $user = User::findOrFail($id);

        // Nếu trạng thái hiện tại là 0, đặt thành 1; ngược lại, đặt thành 0
        $user->status = $user->status == 0 ? 1 : 0;
        $user->save();
        return redirect()->back()->with('success', 'Thao tác thành công');
    }


    public function charts_json()
    {
        $indicators = IndicatorsValue::all();

        // Define the columns for the Google DataTable
        $dataTable = [
            'cols' => [
                ['id' => '', 'label' => 'Name', 'pattern' => '', 'type' => 'string'],
                ['id' => '', 'label' => 'Value', 'pattern' => '', 'type' => 'number'],
                // Add more columns if needed
            ],
            'rows' => []
        ];

        // Add rows to the Google DataTable
        foreach ($indicators as $indicator) {
            $dataTable['rows'][] = [
                'c' => [
                    ['v' => $indicator->name, 'f' => null],
                    ['v' => (float) $indicator->value, 'f' => null],
                ]
            ];
        }

        // Return the data as a JSON response
        return response()->json($dataTable);
    }
}
