interface Day03 {
  puzzle1?: number;
  puzzle2?: number;
  data?: Data[];
}

interface Data {
  backpack: string;
  compartment1: string;
  compartment2: string;
  sameItems: string;
}

interface Group {
  elf1: string;
  elf2: string;
  elf3: string;
  badge: string;
}

const getSameItems = (compartment1: string, compartment2: string): string => {
  let sameItems: string = '';

  for (const c of compartment1) {
    if (compartment2.includes(c) && !sameItems.includes(c)) {
      sameItems = sameItems + c;
    }
  };
  
  return sameItems;
}

const getBadge = (elf1: string, elf2: string, elf3: string): string => {
  let badge: string = '';

  for (const c of elf1) {
    if (elf2.includes(c) && elf3.includes(c) && !badge.includes(c)) {
      badge = badge + c;
    }
  };
  
  return badge;
}

const getGroups = (data: Data[]): Group[] => {
  let groups: Group[] = [];
  if (data.length % 3 === 0) {
    let elf1: string = '';
    let elf2: string = '';
    let elf3: string = '';
    data.forEach((d: Data, i: number) => {
      if (i % 3 === 0) {
        elf1 = d.backpack;
      } else if (i % 3 === 1) { 
        elf2 = d.backpack;
      } else if (i % 3 === 2) {
        elf3 = d.backpack;
        groups.push({ elf1, elf2, elf3, badge: getBadge(elf1, elf2, elf3) });
      }
    });
  }
  return groups;
}

const parseData = (dataSet: string): Data[] => {
  let backpacks: string[] = dataSet.split('\n');
  let data: Data[] = backpacks.map((backpack: string) => {
    let splicePoint: number = Math.ceil(backpack.length / 2);
    let compartment1: string = backpack.slice(0, splicePoint);
    let compartment2: string = backpack.slice(splicePoint);
    let sameItems: string = getSameItems(compartment1, compartment2);
    return { 
      backpack: backpack, 
      compartment1: compartment1, 
      compartment2: compartment2, 
      sameItems: sameItems };
  });
  return data;
}

export default (dataSet: string): Day03 => {
  let data: Data[] = parseData(dataSet);
  let puzzle1: number = 0;
  let puzzle2: number = 0;

  for(const backpack of data) {
    for(const item of backpack.sameItems) {
        let code: number = item.charCodeAt(0);
        //lowercase a-z = 1-26, uppercase A-Z = 27-52
        if (code >= 97 && code <= 122) {
          code = code - 96;
        } else if (code >= 65 && code <= 90) {
          code = code - 38;
        } else { code = 0; }

        puzzle1 = puzzle1 + code;
    }
  }
  let groups: Group[] = getGroups(data);
  for(const group of groups) {
    for(const item of group.badge) {
        let code: number = item.charCodeAt(0);
        //lowercase a-z = 1-26, uppercase A-Z = 27-52
        if (code >= 97 && code <= 122) {
          code = code - 96;
        } else if (code >= 65 && code <= 90) {
          code = code - 38;
        } else { code = 0; }

        puzzle2 = puzzle2 + code;
    }
  }

  return { puzzle1: puzzle1, puzzle2: puzzle2 };
}





