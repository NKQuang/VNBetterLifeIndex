<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class RateController extends Controller
{
    function rating()  {
        $question = Question::all();
        $data['questions'] = $question;
        return view('client.rate',$data);
    }
}

