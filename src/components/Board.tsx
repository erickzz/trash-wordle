import { LetterBox } from "./LetterBox";
import type { BoardState } from "../App";
const ROWS = 6;
const COLS = 5;

type BoardProps = {
  boardState: { state: BoardState; letter: string }[][];
};

export function Board({ boardState }: BoardProps) {
  const letters = boardState.map((row) => row.map((cell) => cell.letter)).flat();
  const states = boardState.map((row) => row.map((cell) => cell.state)).flat();
  return (
    <div
      className="grid w-max grid-cols-5 gap-1.5"
      role="grid"
      aria-label="Word guesses"
    >
      {Array.from({ length: ROWS * COLS }, (_, i) => {
        const row = Math.floor(i / COLS);
        const col = i % COLS;
        return (
          <LetterBox key={`${row}-${col}`} letter={letters[i]} state={states[i]} />
        );
      })}
    </div>
  );
}
