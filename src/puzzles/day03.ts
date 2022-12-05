import {Solution, Day3Data, Day3Group} from '../types';

const getSameItems = (compartment1: string, compartment2: string): string => {
  let sameItems = '';

  for (const c of compartment1) {
    if (compartment2.includes(c) && !sameItems.includes(c)) {
      sameItems = sameItems + c;
    }
  }
  
  return sameItems;
}

const getBadge = (elf1: string, elf2: string, elf3: string): string => {
  let badge = '';

  for (const c of elf1) {
    if (elf2.includes(c) && elf3.includes(c) && !badge.includes(c)) {
      badge = badge + c;
    }
  }
  
  return badge;
}

const getGroups = (data: Day3Data[]): Day3Group[] => {
  const groups: Day3Group[] = [];
  if (data.length % 3 === 0) {
    let elf1 = '';
    let elf2 = '';
    let elf3 = '';
    data.forEach((d: Day3Data, i: number) => {
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

const parseData = (dataSet: string): Day3Data[] => {
  const backpacks: string[] = dataSet.split('\n');
  const data: Day3Data[] = backpacks.map((backpack: string) => {
    const splicePoint: number = Math.ceil(backpack.length / 2);
    const compartment1: string = backpack.slice(0, splicePoint);
    const compartment2: string = backpack.slice(splicePoint);
    const sameItems: string = getSameItems(compartment1, compartment2);
    return { 
      backpack: backpack, 
      compartment1: compartment1, 
      compartment2: compartment2, 
      sameItems: sameItems };
  });
  return data;
}

export default (dataSet: string): Solution => {
  const data: Day3Data[] = parseData(dataSet);
  let puzzle1 = 0;
  let puzzle2 = 0;

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
  const groups: Day3Group[] = getGroups(data);
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