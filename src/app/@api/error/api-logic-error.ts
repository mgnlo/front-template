export class ApiLogicError extends Error {
  code: string;

  constructor(msg: string, code?: string) {
    super(msg);
    if (code) this.code = code;
  }
}
