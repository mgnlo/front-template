
export class ServerSourceInitConfig {

  page?: number;
  perPage?: number;
  sort?: {field: string, direction: string, compare: any}[];
  filters?: {field: string, filter: any, search: string}[];
  andOperator?: boolean;
}
