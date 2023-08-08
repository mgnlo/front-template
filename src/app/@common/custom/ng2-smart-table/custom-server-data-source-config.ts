
export class ServerSourceInitConfig {
  page?: number;
  perPage?: number;
  sort?: { field: string, direction: string, compare: any }[];
  filters?: { key: string, value: string | number | boolean }[];
  andOperator?: boolean;
}
