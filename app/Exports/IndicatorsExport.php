<?php

namespace App\Exports;

use App\Models\IndicatorsValue;
use App\Models\Question;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;

class IndicatorsExport implements FromQuery, WithHeadings, WithStrictNullComparison
{
    protected $request;

    public function __construct($request)
    {
        $this->request = $request;
    }

    public function query()
    {
        $query = IndicatorsValue::query();

        if ($this->request->districts) {
            $query->where('districts_id', $this->request->districts);
        }

        if ($this->request->indicatorsex) {
            $question = Question::find($this->request->indicators);
            if ($question) {
                $query->where('question_code', $question->question_code);
            }
        }
        return $query->where('type', 0);
    }

    public function headings(): array
    {
        return [
            'ID',
            'Name',
            'Value',
            'Type',
            'Districts ID',
            'Question Code',
            'User ID',
            'Created At',
            'Updated At',
        ];
    }
}
