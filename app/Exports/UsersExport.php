<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;

class UsersExport implements FromCollection, WithHeadings, WithStrictNullComparison
{
    protected $gender;
    protected $user_type;
    protected $marital_status;
    protected $profession;
    protected $old;

    function __construct($gender, $user_type, $marital_status, $profession, $old)
    {
        $this->gender = $gender;
        $this->user_type = $user_type;
        $this->marital_status = $marital_status;
        $this->profession = $profession;
        $this->old = $old;
    }
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return User::select('name', 'email', 'gender', 'role', 'phone', 'address', 'old', 'profession', 'marital_status')
            ->when($this->gender, function ($query) {
                return $query->where('gender', $this->gender);
            })
            ->when($this->user_type, function ($query) {
                return $query->where('role', $this->user_type);
            })
            ->when($this->marital_status, function ($query) {
                return $query->where('marital_status', $this->marital_status);
            })
            ->when($this->profession, function ($query) {
                return $query->where('profession', $this->profession);
            })
            ->when($this->old, function ($query) {
                return $query->where('old', $this->old);
            })
            ->get()
            ->makeHidden(['profile_photo_url']);
    }
    public function headings(): array
    {
        return ["Họ Tên", "Email", "Giới tính", "Loại người dùng", "Số điện thoại", "Địa Chỉ", "Nhóm độ tuổi", "Nghề nghiệp", "Tình trạng hôn nhân"];
    }
}
