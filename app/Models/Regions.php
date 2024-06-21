<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Regions extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'code',
        'name',
        'full_name',
        'full_name_en',
    ];
    public function getAll()
    {
        return Regions::all();
    }

    // Get one region by ID
    public function getOne($id)
    {
        return Regions::find($id);
    }

    // Search regions by code
    public function searchByCode($code)
    {
        return Regions::where('code', $code)->get();
    }

    // Search regions by name
    public function searchByName($name)
    {
        return Regions::where('name', 'like', '%' . $name . '%')->get();
    }

    // Create a new region
    public function create($data)
    {
        return Regions::create($data);
    }

    // Update an existing Region
    public function updateRegion($id, $data)
    {
        $region = Regions::find($id);
        if ($region) {
            $region->update($data);
            return $region;
        }
        return null;
    }

    // Delete a region
    public function deleteRegion($id)
    {
        $region = Regions::find($id);
        if ($region) {
            $region->delete();
            return true;
        }
        return false;
    }
}
