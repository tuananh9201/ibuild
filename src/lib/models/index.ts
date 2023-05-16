export interface TreeOptionOriginModel {
    id: string;
    name: string;
}

export interface AreasModal {
    id: string;
    name_vi: string;
    parent_id: string
}

export interface SearchResultModel {
    id: string;
    user_id: string;
    keyword: string;
}

export interface IBaseModel {
    id: number;
    value: string;
}