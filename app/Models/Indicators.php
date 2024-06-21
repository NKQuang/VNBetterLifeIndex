<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Indicators extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'descriptions',
        'created_at',
        'updated_at'
    ];

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
    // Get all indicators
    public function getAll()
    {
        return Indicators::all();
    }

    // Get one indicator by ID
    public function getOne($id)
    {
        return Indicators::find($id);
    }

    // Search indicators by created date
    public function searchForCreated($date)
    {
        return Indicators::whereDate('created_at', $date)->get();
    }

    // Create a new indicator
    public function create($data)
    {
        return Indicators::create($data);
    }

    // Update an existing indicator
    public function updateIndicator($id, $data)
    {
        $indicator = Indicators::find($id);
        if ($indicator) {
            $indicator->update($data);
            return $indicator;
        }
        return null;
    }

    // Delete an indicator
    public function deleteIndicator($id)
    {
        $indicator = Indicators::find($id);
        if ($indicator) {
            $indicator->delete();
            return true;
        }
        return false;
    }
}
