<?php

namespace App\Imports;

use App\Models\IndicatorsValue;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class IndicatorsImport implements ToModel,WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        if (is_null($row['name'])) {
            return null;

        }
        return new IndicatorsValue([
            'name' => $row['name'],
            'districts_id' =>  $row['districts_id'],
            'value' =>  $row['value'],
            'indicators_id' =>  $row['indicators_id'],
            'type' => 1
        ]);
    }
}
