export interface Response {
  type: string;
  data: unknown;
  error?: boolean;
}

export interface Transformer {
  can_transform: (path: string) => Promise<boolean>;
  to_response: (path: string) => Promise<Response>;
}
