export interface Data {
  [key: string]: string;
}
export interface Puzzles {
  [key: string]: (data: string) => Solution;
}

export interface Solution {
  puzzle1?: number;
  puzzle2?: number;
}
