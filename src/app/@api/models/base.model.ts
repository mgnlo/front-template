export class ResponseModel<T> {
  success: boolean;
  code: number;
  message: string;
  result: T;
}