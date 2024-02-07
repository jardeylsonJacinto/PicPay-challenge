export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super('InvalidParamError');
    this.name = `Invalid param: ${paramName}`;
  }
}
