<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\District;
use App\Models\Districts;
use App\Models\Indicator;
use App\Models\Indicators;
use App\Models\IndicatorsValue;
use App\Models\IndicatorValue;
use App\Models\Weight;
use App\Models\Weights;

class WbiController extends Controller
{
    public function calculateWbi(Request $request)
    {
        $districts = Districts::all();
        $result = [];

        foreach ($districts as $district) {
            $indicators = Indicators::all();
            $indicatorResults = [];

            foreach ($indicators as $indicator) {
                $valuesType1 = IndicatorsValue::where('districts_id', $district->id)
                    ->where('type', 1)
                    ->whereHas('question', function ($query) use ($indicator) {
                        $query->where('indicator_id', $indicator->id);
                    })
                    ->pluck('value');

                $valuesType0 = IndicatorsValue::where('districts_id', $district->id)
                    ->where('type', 0)
                    ->whereHas('question', function ($query) use ($indicator) {
                        $query->where('indicator_id', $indicator->id);
                    })
                    ->pluck('value');

                $averageType1 = $valuesType1->average();
                $averageType0 = $valuesType0->average();

               // dd($averageType1,$averageType0);
                $indicatorValue = (2/3 * $averageType1) + (1/3 * $averageType0);

                $weight = Weights::where('indicators_id', $indicator->id)->first()->value;
                $weightNumeric = str_replace('%', '', $weight) / 100; // Chuyển đổi từ % thành số thập phân
                    //dd($weightNumeric);
                $weightedValue = $indicatorValue * $weightNumeric;
                $indicatorResults[] = [
                    'indicator_id' => $indicator->id,
                    'indicator' => $indicator->name,
                    'value' => $indicatorValue,
                    'weightedValue' =>$weightedValue
                ];
            }

            $wbi = collect($indicatorResults)->sum('weightedValue');

            $result[] = [
                'district_id' =>$district->id,
                'district' => $district->name,
                'value' => $wbi,
                'indicators' => $indicatorResults
            ];
        }

        return response()->json($result);
    }
}

