export interface RequestOptions {
  /** Query parameters ?page=1&pageSize=10 */
  query?: Record<string, string | number | boolean>;

  /** Headers extra (Authorization, custom headers, etc) */
  headers?: Record<string, string>;
}