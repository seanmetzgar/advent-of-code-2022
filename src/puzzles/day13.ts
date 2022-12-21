import { Solution } from '../types';

type Packet = number | undefined | Packet[];

const compare = (a: Packet, b: Packet): boolean | undefined => {
	if (typeof a === 'number' && typeof b === 'number') {
		return a > b ? false : a < b ? true : undefined;
	} else if (Array.isArray(a) !== Array.isArray(b)) {
    if (!Array.isArray(a)) { a = [a]; }
    if (!Array.isArray(b)) { b = [b]; }
    return compare(a, b);
	}

  if (Array.isArray(a) && Array.isArray(b)) {
    for (let i = 0, end = Math.max(a.length, b.length); i < end; i++) {
      if (a[i] === undefined) return true;
      if (b[i] === undefined) return false;
      const result = compare(a[i], b[i]);
      if (result !== undefined) return result;
    }
  }

	return undefined;
}

const same = (a: Packet, b: Packet): boolean => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a === b;
  }
  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    for (let i = 0, end = Math.max(a.length, b.length); i < end; i++) {
      if (a[i] === undefined || b[i] === undefined) return false;
      if (!same(a[i], b[i])) return false;
    }
  }
  return true;
}

const puzzle1 = (packetA: Packet[], packetB: Packet[]): number => {
  let count = 0;
  for (let i: number = 0; i < Math.max(packetA.length, packetB.length); i++) {
    count += compare(packetA[i], packetB[i]) ? i + 1 : 0;

  }

  return count;
}

const puzzle2 = (packetsA: Packet[], packetsB: Packet[], decoderPackets: Packet[]): number => {
  const stream = [
    ...packetsA,
    ...packetsB,
		...decoderPackets
	].sort((a, b) => {
		const result = compare(a, b);
		return result === undefined ? 0 : result ? -1 : 1;
	});

  return decoderPackets.reduce((accumulator: number, packet) => 
    accumulator * (1 + stream.findIndex(p => 
      JSON.stringify(p) === JSON.stringify(packet)
    )), 1);
}

export default (dataSet: string): Solution => {
  const packetsA: Packet[] = [];
  const packetsB: Packet[] = [];

  dataSet.split('\n\n').forEach((group: string) => {
    const parts = group.split('\n');
    packetsA.push(JSON.parse(parts[0]));
    packetsB.push(JSON.parse(parts[1]));
  });
  
  return { puzzle1: puzzle1(packetsA, packetsB), puzzle2: puzzle2(packetsA, packetsB, [[[2]], [[6]]]) };
};