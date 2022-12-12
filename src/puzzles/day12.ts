import { Solution } from '../types';

interface Coordinates {
  x: number;
  y: number;
}
interface Point {
  position: Coordinates;
  visited: boolean;
  height: number;
  distance: number;
  adjacent: Point[];
}

type Map = Point[][];

const resetMap = (map: Map): Map => {
  map.map((row) => {
    return row.map((point) => {
      point.visited = false;
      point.distance = Infinity;
      return point;
    });
  });
  return map;
};

const pathfinder = (
  map: Map,
  start: Coordinates,
  end: Coordinates,
  puzzle2 = false,
) => {
  //find end in map

  if (map[end.y][end.x]) {
    const endPoint = map[end.y][end.x];
    endPoint.distance = 0;
    const queue: Point[] = [endPoint];

    while (queue.length) {
      queue.sort((a, b) => b.distance - a.distance);
      const currentPoint = queue.pop();
      if (currentPoint) {
        for (const possiblePoint of currentPoint.adjacent) {
          if (
            !possiblePoint.visited &&
            currentPoint.height - possiblePoint.height < 2
          ) {
            const distance = currentPoint.distance + 1;
            if (
              (possiblePoint.position.x == 0 &&
                possiblePoint.position.y == start.y) ||
              (puzzle2 && possiblePoint.position.x == 0)
            ) {
              return distance;
            } else {
              possiblePoint.visited = true;
              possiblePoint.distance = Math.min(
                distance,
                possiblePoint.distance,
              );
              queue.push(possiblePoint);
            }
          }
        }
      }
    }
  }
  return Infinity;
};

export default (dataSet: string): Solution => {
  let start: Coordinates = { x: 0, y: 0 };
  let end: Coordinates = { x: 0, y: 0 };

  const deltas: Coordinates[] = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
  ];

  const emptyPoints: Point[] = [];

  const map: Map = dataSet.split('\n').map((row, y) => {
    return row.split('').map((val, x) => {
      const point = {
        position: { x, y },
        visited: false,
        height: val.charCodeAt(0) - 96,
        distance: Infinity,
        adjacent: emptyPoints,
      };
      if (val === 'S') {
        point.height = 1;
        start = point.position;
      }
      if (val === 'E') {
        point.height = 26;
        end = point.position;
      }
      return point;
    });
  });

  // Get all adjacent points
  map.map((row) => {
    row.map((point) => {
      const adjacent: Point[] = [];
      for (const shift of deltas) {
        if (!map[point.position.y + shift.y]) continue;
        const adjPoint =
          map[point.position.y + shift.y][point.position.x + shift.x];
        if (!adjPoint) continue;
        adjacent.push(adjPoint);
      }
      point.adjacent = adjacent;
    });
  });

  const puzzle1: number = pathfinder(map, start, end);
  resetMap(map);
  const puzzle2: number = pathfinder(map, start, end, true);

  return { puzzle1: puzzle1, puzzle2: puzzle2 };
};
