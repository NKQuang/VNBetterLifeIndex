export interface ResponseGetdistricts {
    authenticated: boolean;
    districts: District[];
}

export interface District {
    id: number;
    name: string;
    full_name: string;
    full_name_en: string;
    regions_code: number;
    created_at: null;
    updated_at: null;
    questions: Question[];
    indicator_values: any[];
    content: any;
}

export interface Question {
    id: number;
    title: string;
    question_code: string;
    content: null;
    indicator_id: number;
    created_at: Date;
    updated_at: Date;
    evaluated: boolean;
    value: null;
    indicator: Indicator;
}

export interface Indicator {
    id: number;
    name: string;
    descriptions: string;
    created_at: null;
    updated_at: null;
}