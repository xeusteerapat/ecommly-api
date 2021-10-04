export interface JWKRoot {
  keys: JWKKey[];
}

export interface JWKKey {
  alg: string;
  e: string;
  kid: string;
  kty: string;
  n: string;
  use: string;
}
