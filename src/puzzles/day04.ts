interface Day04 {
  puzzle1?: number;
  puzzle2?: number;
  data?: ElfGroup[];
}

interface Elf {
  begin: number;
  end: number;
}
interface ElfGroup {
  elf1: Elf;
  elf2: Elf;
}

const getElfGroups = (data: string): ElfGroup[] => {
  const elfGroups: Array<ElfGroup | null> = data.split('\n').map((line: string) => {
    const matches: string[] | null= line.match(/(\d+)-(\d+),(\d+)-(\d+)/);
    if (matches) {
      return {
        elf1: { begin: parseInt(matches[1]), end: parseInt(matches[2]) },
        elf2: { begin: parseInt(matches[3]), end: parseInt(matches[4]) }
      };
    } else {
      return null;
    }
  });
  return elfGroups.filter((group: ElfGroup | null) => group !== null) as ElfGroup[];
}

const getPuzzle1 = (data: ElfGroup[]): number => {
  let total = 0;

  data.forEach((group: ElfGroup) => {
    // Check if Elf 1 fully contains Elf 2 or Elf 2 fully contains Elf 1
    if ((group.elf1.begin <= group.elf2.begin && group.elf1.end >= group.elf2.end) ||
        (group.elf2.begin <= group.elf1.begin && group.elf2.end >= group.elf1.end)) {
      total++;
    }
  });
  return total;
}

const getPuzzle2 = (data: ElfGroup[]): number => {
  let total = 0;

  data.forEach((group: ElfGroup) => {
    // Check if range of Elf 1 overlaps with range of Elf 2
    if ((group.elf1.begin <= group.elf2.begin && group.elf1.end >= group.elf2.begin) ||
        (group.elf2.begin <= group.elf1.begin && group.elf2.end >= group.elf1.begin)) {
      total++;
    }
  });

  return total;
}

export default (dataSet: string): Day04 => {
  const elfGroups: ElfGroup[] = getElfGroups(dataSet);

  return { puzzle1: getPuzzle1(elfGroups), puzzle2: getPuzzle2(elfGroups) };
}