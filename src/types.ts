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

//Day 2 Specific
export type RoundStatus = 'win' | 'lose' | 'draw' | 'unknown';

export interface Round {
  opponent: string;
  player: string;
  puzzle1Status: RoundStatus;
  puzzle1Points: number;
  puzzle2Player: string; //Use previous X,Y,Z
  puzzle2Points: number;
}

//Day 3 Specific
export interface Day3Data {
  backpack: string;
  compartment1: string;
  compartment2: string;
  sameItems: string;
}
export interface Day3Group {
  elf1: string;
  elf2: string;
  elf3: string;
  badge: string;
}

//Day 4 Specific
export interface Day4Elf {
  begin: number;
  end: number;
}
export interface Day4ElfGroup {
  elf1: Day4Elf;
  elf2: Day4Elf;
}