<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Weights extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'value',
        'created_at',
        'updated_at',
        'indicators_id'
    ];
    // Get all Weightss
    public function getAll()
    {
        return Weights::all();
    }

    // Get one Weights by ID
    public function getOne($id)
    {
        return Weights::find($id);
    }

    // Search Weightss by name
    public function searchByName($name)
    {
        return Weights::where('name', 'like', '%' . $name . '%')->get();
    }

    // Search Weightss by created_at date
    public function searchByCreatedAt($date)
    {
        return Weights::whereDate('created_at', $date)->get();
    }

    // Create a new Weights
    public function create($data)
    {
        return Weights::create($data);
    }

    // Update an existing Weights
    public function updateWeights($id, $data)
    {
        $Weights = Weights::find($id);
        if ($Weights) {
            $Weights->update($data);
            return $Weights;
        }
        return null;
    }

    // Delete a Weights
    public function deleteWeights($id)
    {
        $Weights = Weights::find($id);
        if ($Weights) {
            $Weights->delete();
            return true;
        }
        return false;
    }

    public function indicator()
    {
        return $this->belongsTo(Indicators::class, 'indicators_id');
    }
}
