export class ApiLogicError extends Error {
  code: number;

  constructor(msg: string, code?: number) {
    super(msg);
    if (code) this.code = code;
  }
}
