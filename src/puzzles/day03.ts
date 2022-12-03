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

const getSameItems = (compartment1: string, compartment2: string): string => {
  let sameItems: string = '';

  for (const c of compartment1) {
    if (compartment2.includes(c) && !sameItems.includes(c)) {
      sameItems = sameItems + c;
    }
  };
  
  return sameItems;
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
  let puzzle1 = 0;
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
  return { puzzle1: puzzle1};
}





