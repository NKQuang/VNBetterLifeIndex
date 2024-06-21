<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Districts extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'full_name',
        'full_name_en',
        'regions_code'
    ];
    // Trong model Districts
public function populations()
{
    return $this->hasMany(Populations::class, 'districts_id');
}

    public function getAll()
    {
        return Districts::all();
    }

    // Get one district by ID
    public function getOne($id)
    {
        return Districts::find($id);
    }

    // Get districts by regions_code
    public function getWithRegionsCode($regions_code)
    {
        return Districts::where('regions_code', $regions_code)->get();
    }

    // Create a new district
    public function create($data)
    {
        return Districts::create($data);
    }

    // Update an existing district
    public function updateDistrict($id, $data)
    {
        $district = Districts::find($id);
        if ($district) {
            $district->update($data);
            return $district;
        }
        return null;
    }

    // Delete a district
    public function deleteDistrict($id)
    {
        $district = Districts::find($id);
        if ($district) {
            $district->delete();
            return true;
        }
        return false;
    }
    public function indicatorValues()
    {
        return $this->hasMany(IndicatorsValue::class, 'districts_id');
    }
}
