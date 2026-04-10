import type { BoardState } from "../App";
type LetterBoxProps = {
  letter?: string | null;
  state?: BoardState;
};

export function LetterBox({ letter, state }: LetterBoxProps) {
  const char = letter?.slice(0, 1).toUpperCase() ?? null;

  const color = state === 'correct' ? 'bg-green-500' : state === 'misplaced' ? 'bg-yellow-500' : 'bg-zinc-900';

  return (
    <div
      className={`flex size-14 items-center justify-center border border-zinc-700 font-mono text-xl uppercase text-zinc-100 ${color}`}
      aria-hidden={!char}
    >
      {char || null}
    </div>
  );
}
