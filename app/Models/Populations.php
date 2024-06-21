<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Populations extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'value',
        'districts_id',
        'created_at',
        'updated_at'
    ];
    // Trong model Populations
public function district()
{
    return $this->belongsTo(Districts::class, 'districts_id');
}

    public function getAll()
    {
        return Populations::all();
    }

    // Get one Populations by ID
    public function getOne($id)
    {
        return Populations::find($id);
    }

    // Search Populations by districts_id
    public function searchForDistrictsId($districts_id)
    {
        return Populations::where('districts_id', $districts_id)->get();
    }

    // Search Populations by created_at date
    public function searchForCreatedAt($date)
    {
        return Populations::whereDate('created_at', $date)->get();
    }

    // Create a new Populations
    public function create($data)
    {
        return Populations::create($data);
    }

    // Update an existing Populations
    public function updatePopulations($id, $data)
    {
        $Populations = Populations::find($id);
        if ($Populations) {
            $Populations->update($data);
            return $Populations;
        }
        return null;
    }

    // Delete a Populations
    public function deletePopulations($id)
    {
        $Populations = Populations::find($id);
        if ($Populations) {
            $Populations->delete();
            return true;
        }
        return false;
    }

}
