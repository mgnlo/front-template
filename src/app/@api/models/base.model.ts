export class ResponseModel<T> {
  code: string;
  message: string;
  result: T;
}

export interface ResData<T> {
  content: T
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: Pageable
  size: number
  sort: {sorted: boolean, unsorted: boolean, empty: boolean}
  totalElements: number
  totalPages: number
}

export interface Pageable {
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
  sort: {sorted: boolean, unsorted: boolean, empty: boolean}
  unpaged: boolean
}