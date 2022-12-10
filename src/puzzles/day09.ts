import { Solution } from '../types';

interface Motion {
  direction: string;
  distance: number;
}
interface Position {
  x: number;
  y: number;
}
const getTailCounts = (motions: Motion[]): Solution => {
  const currentHead: Position = { x: 0, y: 0 };
  let currentTail: Position = { x: 0, y: 0 };
  const followers: Position[] = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];
  const tailTracker: Position[] = [];
  const tailTracker2: Position[] = [];

  for (const motion of motions) {
    for (let i = 0; i < motion.distance; i++) {
      switch (motion.direction) {
        case 'U':
          currentHead.y++;
          break;
        case 'D':
          currentHead.y--;
          break;
        case 'R':
          currentHead.x++;
          break;
        case 'L':
          currentHead.x--;
          break;
      }
      currentTail = moveKnot(currentHead, currentTail);

      for (let j = 0; j < followers.length; j++) {
        followers[j] =
          j == 0
            ? moveKnot(currentHead, followers[j])
            : moveKnot(followers[j - 1], followers[j]);
      }

      tailTracker.push({ x: currentTail.x, y: currentTail.y });
      tailTracker2.push({ x: followers[8].x, y: followers[8].y });
    }
  }
  // Remove duplicate tails from tailTracker
  const uniqueTails = tailTracker.filter(
    (tail, index, self) =>
      index === self.findIndex((t) => t.x === tail.x && t.y === tail.y),
  );
  const uniqueTails2 = tailTracker2.filter(
    (tail2, index2, self2) =>
      index2 === self2.findIndex((t2) => t2.x === tail2.x && t2.y === tail2.y),
  );
  return { puzzle1: uniqueTails.length, puzzle2: uniqueTails2.length };
};

const moveKnot = (moved: Position, moving: Position): Position => {
  if (moved.x == moving.x && moved.y == moving.y) return moving;
  //Horrizontal
  else if (moved.y == moving.y) {
    if (moved.x > moving.x + 1) while (moved.x > moving.x + 1) moving.x++;
    else if (moved.x < moving.x - 1) while (moved.x < moving.x - 1) moving.x--;
  }
  //Vertical
  else if (moved.x == moving.x) {
    if (moved.y > moving.y + 1) while (moved.y > moving.y + 1) moving.y++;
    else if (moved.y < moving.y - 1) while (moved.y < moving.y - 1) moving.y--;
  }
  //Diagonals
  else if (moved.x == moving.x + 1) {
    if (moved.y > moving.y + 1) {
      moving.y++;
      moving.x++;

      while (moved.y > moving.y + 1) {
        moving.y++;
      }
    } else if (moved.y < moving.y - 1) {
      moving.y--;
      moving.x++;

      while (moved.y < moving.y - 1) {
        moving.y--;
      }
    }
  } else if (moved.x == moving.x - 1) {
    if (moved.y > moving.y + 1) {
      moving.y++;
      moving.x--;

      while (moved.y > moving.y + 1) {
        moving.y++;
      }
    } else if (moved.y < moving.y - 1) {
      moving.y--;
      moving.x--;

      while (moved.y < moving.y - 1) {
        moving.y--;
      }
    }
  } else if (moved.y == moving.y + 1) {
    if (moved.x > moving.x + 1) {
      moving.x++;
      moving.y++;

      while (moved.x > moving.x + 1) {
        moving.x++;
      }
    } else if (moved.x < moving.x - 1) {
      moving.x--;
      moving.y++;

      while (moved.x < moving.x - 1) {
        moving.x--;
      }
    }
  } else if (moved.y == moving.y - 1) {
    if (moved.x > moving.x + 1) {
      moving.x++;
      moving.y--;

      while (moved.x > moving.x + 1) {
        moving.x++;
      }
    } else if (moved.x < moving.x - 1) {
      moving.x--;
      moving.y--;

      while (moved.x < moving.x - 1) {
        moving.x--;
      }
    }
  } else if (moved.x == moving.x + 2 && moved.y == moving.y + 2) {
    while (moved.x > moving.x + 1 && moved.y == moving.y + 2) {
      moving.x++;
      moving.y++;
    }
  } else if (moved.x == moving.x + 2 && moved.y == moving.y - 2) {
    while (moved.x == moving.x + 2 && moved.y == moving.y - 2) {
      moving.x++;
      moving.y--;
    }
  } else if (moved.x == moving.x - 2 && moved.y == moving.y + 2) {
    while (moved.x == moving.x - 2 && moved.y == moving.y + 2) {
      moving.x--;
      moving.y++;
    }
  } else if (moved.x == moving.x - 2 && moved.y == moving.y - 2) {
    while (moved.x == moving.x - 2 && moved.y == moving.y - 2) {
      moving.x--;
      moving.y--;
    }
  }

  return moving;
};

export default (dataSet: string): Solution => {
  const motions: Motion[] = dataSet.split('\n').map((line) => {
    const motion = line.split(' ');
    return {
      direction: motion[0],
      distance: parseInt(motion[1]),
    };
  });

  return getTailCounts(motions);
};
