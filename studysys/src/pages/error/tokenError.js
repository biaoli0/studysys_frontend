export class TokenError extends Error {
  constructor(msg) {
    super(msg);
    this.message = msg;
    this.name = "LoginError";
  }
}
