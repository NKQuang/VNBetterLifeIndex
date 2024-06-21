<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    // Các trường có thể điền
    protected $fillable = [
        'id',
        'title',
        'content',
        'question_code',
        'indicator_id',
    ];

    // Quan hệ với Indicator
    public function indicator()
    {
        return $this->belongsTo(Indicators::class);
    }

    // Quan hệ với UserAnswer
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
