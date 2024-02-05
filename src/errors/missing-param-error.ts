export class MissingParamError extends Error {
  constructor(paraName: string) {
    super(`missing param: ${paraName}`);
    this.name = 'MissingParamError';
  }
}
