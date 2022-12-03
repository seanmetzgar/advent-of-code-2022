interface Day02 {
  puzzle1?: number;
  puzzle2?: number;
  data?: Round[];
}

type roundStatus = 'win' | 'lose' | 'draw' | 'unknown';

interface Round {
  opponent: string;
  player: string;
  puzzle1Status: roundStatus;
  puzzle1Points: number;
  puzzle2Player: string; //Use previous X,Y,Z
  puzzle2Points: number;
}

// Rock = A|X (1 Point)
// Paper = B|Y (2 Points)
// Scissors = C|Z (3 Points)
// Draw = 3 Points
// Win = 6 Points

const getPuzzle1Status = (opponent: string, player: string): roundStatus => { 
  //Player Wins
  if (player === 'X' && opponent === 'C') return 'win';
  if (player === 'Y' && opponent === 'A') return 'win';
  if (player === 'Z' && opponent === 'B') return 'win';
  //Player Loses
  if (player === 'X' && opponent === 'B') return 'lose';
  if (player === 'Y' && opponent === 'C') return 'lose';
  if (player === 'Z' && opponent === 'A') return 'lose';
  //Draw
  if (player === 'X' && opponent === 'A') return 'draw';
  if (player === 'Y' && opponent === 'B') return 'draw';
  if (player === 'Z' && opponent === 'C') return 'draw';

  return 'unknown';
}

const getPuzzle2Player = (opponent: string, status: string): string => {
  //X = Lose
  //Y = Draw
  //Z = Win

  //Wins
  if (status === 'Z' && opponent === 'A') return 'Y';
  if (status === 'Z' && opponent === 'B') return 'Z';
  if (status === 'Z' && opponent === 'C') return 'X';

  //Losses
  if (status === 'X' && opponent === 'A') return 'Z';
  if (status === 'X' && opponent === 'B') return 'X';
  if (status === 'X' && opponent === 'C') return 'Y';

  //Draws
  if (status === 'Y' && opponent === 'A') return 'X';
  if (status === 'Y' && opponent === 'B') return 'Y';
  if (status === 'Y' && opponent === 'C') return 'Z';

  return 'unknown';
}

const getPoints = (player: string, status: roundStatus|string): number => { 
  let points = 0;

  //if statu is draw or Y points are 3
  if (status === 'draw' || status === 'Y') points = points + 3;
  if (status === 'win' || status === 'Z') points = points + 6;

  if (player === 'X') points = points + 1;
  if (player === 'Y') points = points + 2;
  if (player === 'Z') points = points + 3;

  return points;
}

//Get sum of all points
const getPointsTotalP1 = (data: Round[]): number => data.reduce((a, b) => a + b.puzzle1Points, 0);
const getPointsTotalP2 = (data: Round[]): number => data.reduce((a, b) => a + b.puzzle2Points, 0);

export default (dataSet: string): Day02 => {
  let splitData: string[] = dataSet.split('\n');
  let rounds: Round[] = splitData.map((round: string) => {
    let splitRound: string[] = round.split(' ');
    let opponent: string = splitRound[0];
    let player: string = splitRound[1];
    let puzzle1Status: roundStatus = getPuzzle1Status(opponent, player);
    let puzzle1Points: number = getPoints(player, puzzle1Status);
    let puzzle2Player: string = getPuzzle2Player(opponent, player);
    let puzzle2Points: number = getPoints(puzzle2Player, player);
    return { 
      opponent: opponent, 
      player: player, 
      puzzle1Status: puzzle1Status, 
      puzzle1Points: puzzle1Points,
      puzzle2Player: puzzle2Player,
      puzzle2Points: puzzle2Points
   };
  });
  let pointsTotalP1: number = getPointsTotalP1(rounds);
  let pointsTotalP2: number = getPointsTotalP2(rounds);
  return { puzzle1: pointsTotalP1, puzzle2: pointsTotalP2 };
}