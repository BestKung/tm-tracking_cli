/**
 * Created by best on 11/9/2559.
 */
export class Page<T> {
    content: T[] = [];
    last: boolean;
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: string;
}
