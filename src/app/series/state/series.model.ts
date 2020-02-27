import { ID } from '@datorama/akita';

export type DataPoints = {
    name: string;
    value: string;
}

export interface BaseSeries {
    name: string;
    flag: string;
    series: DataPoints[];
}

export interface Series extends BaseSeries {
    naics: number;
    item: string;
    topic: string;
    subtopic: string;
    itemType: string;
    dataType: string;
    form: string;
    table: string;
    view: string;
    lastUpdated: string;
    updatedBy: string;
}


export interface DfResource {
    resource: DfSeries[]
}

export interface BaseDfSeries {
    name: string;
    flag: string;
    statp: string;
    org_val: string;
}

export interface DfSeries extends BaseDfSeries{
    naics: number;
    item: string;
    topic: string;
    subtopic: string;
    item_type: string;
    data_type: string;
    form: string;
    tbl: string;
    view: string;
    last_updated: string;
    updated_by: string;

    final_val1: string;
    raked: string;
    sea_adjust: string;
    sea_unadjust: string;
    benchmark: string;
}