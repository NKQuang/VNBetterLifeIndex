<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reviews extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id',
        'indicators_id',
        'created_at',
        'updated_at'
    ];
    // Get all reviews
    public function getAll()
    {
        return Reviews::all();
    }

    // Get one review by ID
    public function getOne($id)
    {
        return Reviews::find($id);
    }

    // Search reviews by user_id
    public function searchByUserId($user_id)
    {
        return Reviews::where('user_id', $user_id)->get();
    }

    // Search reviews by indicators_id
    public function searchByIndicatorsId($indicators_id)
    {
        return Reviews::where('indicators_id', $indicators_id)->get();
    }

    // Search reviews by created_at date
    public function searchByCreatedAt($date)
    {
        return Reviews::whereDate('created_at', $date)->get();
    }

    // Create a new review
    public function create($data)
    {
        return Reviews::create($data);
    }

    // Update an existing Review
    public function updateReview($id, $data)
    {
        $review = Reviews::find($id);
        if ($review) {
            $review->update($data);
            return $review;
        }
        return null;
    }

    // Delete a review
    public function deleteReview($id)
    {
        $review = Reviews::find($id);
        if ($review) {
            $review->delete();
            return true;
        }
        return false;
    }
}
