export type Board = Array<number|undefined>[];

/**
 * Generic Adapter that all other adapters should extend.
 */
export declare class Adapter {
  static read(data: string): Board;
  static write(data: Board): string;
}
