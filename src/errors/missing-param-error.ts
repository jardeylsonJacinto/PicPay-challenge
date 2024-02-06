export class MissingParamError extends Error {
  constructor(paraName: string) {
    super('MissingParamError');
    this.name = `missing param: ${paraName}`;
  }
}
