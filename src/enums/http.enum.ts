export enum HttpStatus {
  // success
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,

  // Client side
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,

  // Serverside
  INTERNAL_SERVER = 500,
}
