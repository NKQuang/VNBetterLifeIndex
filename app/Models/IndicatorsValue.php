<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndicatorsValue extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'value',
        'type',
        'districts_id',
        'indicators_id',
        'user_id',
        'created_at',
        'updated_at',
        'indicators_id'
    ];

    public function question()
    {
        return $this->belongsTo(Question::class, 'indicators_id', 'indicator_id');
    }


    public function getAll()
    {
        return IndicatorsValue::all();
    }

    // Get one IndicatorsValue by ID
    public function getOne($id)
    {
        return IndicatorsValue::find($id);
    }

    // Get IndicatorsValue by type
    public function getByType($type)
    {
        return IndicatorsValue::where('type', $type)->get();
    }

    // Search IndicatorsValue by districts_id
    public function searchForDistrictsId($districts_id)
    {
        return IndicatorsValue::where('districts_id', $districts_id)->get();
    }


    // Search IndicatorsValue by created_at date
    public function searchForCreatedAt($date)
    {
        return IndicatorsValue::whereDate('created_at', $date)->get();
    }

    // Create a new IndicatorsValue
    public function create($data)
    {
        return IndicatorsValue::create($data);
    }

    // Update an existing IndicatorsValue
    public function updateIndicatorsValue($id, $data)
    {
        $indicatorsValue = IndicatorsValue::find($id);
        if ($indicatorsValue) {
            $indicatorsValue->update($data);
            return $indicatorsValue;
        }
        return null;
    }

    // Delete an IndicatorsValue
    public function deleteIndicatorsValue($id)
    {
        $indicatorsValue = IndicatorsValue::find($id);
        if ($indicatorsValue) {
            $indicatorsValue->delete();
            return true;
        }
        return false;
    }

    public function indicators()
    {
        return $this->belongsTo(Indicators::class, 'indicators_id');
    }

    public function district()
    {
        return $this->belongsTo(Districts::class, 'districts_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
