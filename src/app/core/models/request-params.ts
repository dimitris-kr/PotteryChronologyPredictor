export type SortOrder = 'asc' | 'desc';

export interface SortState<SortBy extends string = string> {
    sort_by: SortBy;
    order: SortOrder;
}

export interface PageState {
    offset: number;
    limit: number;
}

export interface RequestParams <
    SortBy extends string = string,
    Filters extends Record<string, any> = {}
> {
    page: PageState;
    sort: SortState<SortBy>;
    filters: Partial<Filters>;
}
