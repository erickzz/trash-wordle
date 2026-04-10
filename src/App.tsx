import { useState } from "react";
import { Board } from "./components/Board";
import { words } from "./components/words";

export type BoardState = "blank" | "correct" | "misplaced";

const WORD = words[Math.floor(Math.random() * words.length)];

function App() {
  const [currGuess, setCurrGuess] = useState<number>(0);
  const [guess, setGuess] = useState<string | null>("");

  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);

  const [boardState, setBoardState] = useState<{ state: BoardState; letter: string }[][]>(
    Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ({ state: 'blank' as BoardState, letter: '' }))),
  );

  const validateGuess = () => {
    const target = WORD.split("");
    const state: { state: BoardState; letter: string }[] = [];
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === target[i]) {
        state[i] = { state: 'correct', letter: guess[i] };
        target[i] = ""
      }
      else {
        state[i] = { state: 'blank', letter: guess[i] };
      }
    }
    for (let i = 0; i < guess.length; i++) {
      if (state[i].state === 'correct') continue;
      if (target.includes(guess[i])) {
        state[i] = { state: 'misplaced', letter: guess[i] };

        target[target.indexOf(guess[i])] = "";
      }
    }
    return state;
  }

  const checkGuess = () => {
    if (guess?.length < 5 || gameOver) return;
    setBoardState(prev => {
      const board = [...prev];
      const newState = validateGuess();
      board[currGuess] = newState;
      return board;
    })
    if (guess === WORD) {
      setGameOver(true);
      setGameWon(true);
      return;
    }
    setCurrGuess(prev => prev + 1);
    setGuess("");
  };


  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-zinc-100">
      <div className="flex min-h-[calc(100vh-3rem)] flex-col items-center justify-center gap-8">
        <h1 className="text-sm font-medium tracking-[0.2em] text-zinc-400 uppercase">
          Trash Letreco
        </h1>
        <Board boardState={boardState} />
        {gameOver && !gameWon && (
          <div className="text-center text-zinc-400">
            {WORD.toUpperCase()}
          </div>
        )}
        <form
          className="flex flex-col items-center gap-8"
          onSubmit={(e) => {
            e.preventDefault();
            checkGuess();
          }}
        >
          <input
            type="text"
            name="guess"
            maxLength={5}
            placeholder="Palpite"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={gameOver}
            className="w-24 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 font-mono text-zinc-100 uppercase outline-none placeholder:text-zinc-600 focus:ring-1 focus:ring-zinc-500"
          />
          <button
            type="submit"
            className="shrink-0 rounded-md bg-zinc-100 px-4 py-2 font-medium text-zinc-950 hover:bg-zinc-200"
            disabled={gameOver}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
