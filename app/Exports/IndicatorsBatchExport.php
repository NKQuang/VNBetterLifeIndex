<?php

namespace App\Exports;

use App\Models\IndicatorsValue;
use App\Models\Question;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class IndicatorsBatchExport implements FromQuery, WithHeadings, WithMapping
{
    protected $request;
    protected $offset;

    public function __construct($request, $offset)
    {
        $this->request = $request;
        $this->offset = $offset;
    }

    public function query()
    {
        $query = IndicatorsValue::query();

        if ($this->request->district) {
            $query->where('districts_id', $this->request->district);
        }

        if ($this->request->date) {
            $query->whereDate('created_at', $this->request->date);
        }

        if ($this->request->indicators) {
            $question = Question::find($this->request->indicators);
            if ($question) {
                $query->where('question_code', $question->question_code);
            }
        }

        return $query->where('type', 0)->offset($this->offset)->limit(1000);
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

    public function map($indicatorValue): array
    {
        return [
            $indicatorValue->id,
            $indicatorValue->name,
            $indicatorValue->value,
            $indicatorValue->type,
            $indicatorValue->districts_id,
            $indicatorValue->question_code,
            $indicatorValue->user_id,
            $indicatorValue->created_at,
            $indicatorValue->updated_at,
        ];
    }
}
