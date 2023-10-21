import React from "react";
import { useAtomValue } from "jotai";
import {
  guessedItemsAtom,
  currentGameMode,
  pokemonToGuessAtom,
  gameOverAtom,
  dailyAtom,
  guessAtom,
  Pokemon,
} from "@/atoms/GameAtoms";
import { Button } from "./ui/Button";
import { defaultGuesses } from "@/constants";
import { Icons } from "./Icons";

const emojis: { [key: string]: string } = {
  incorrect: "🟥",
  correct: "🟩",
  lower: "🔽",
  higher: "🔼",
};

export default function Share() {
  const mode = useAtomValue(currentGameMode);
  const correctAnswer = useAtomValue(pokemonToGuessAtom)[
    mode
  ] as Pokemon | null;
  const attempts = useAtomValue(guessAtom)[mode];
  const guesses = useAtomValue(guessedItemsAtom)[mode] as Pokemon[];
  const gameOver = useAtomValue(gameOverAtom);
  const { id } = useAtomValue(dailyAtom);

  const comparePokemonValue = (
    correctValue: number,
    guessedValue: number,
  ): string => {
    if (guessedValue === correctValue) return emojis["correct"];
    return guessedValue < correctValue ? emojis["higher"] : emojis["lower"];
  };

  const comparePokemonTypes = (
    correctTypes: string[],
    guessedTypes: string[],
  ): string[] => {
    return guessedTypes.map((type) =>
      correctTypes.includes(type) ? emojis["correct"] : emojis["incorrect"],
    );
  };

  const createEmojiGrid = (): string => {
    if (!correctAnswer) return ""; // Handle null value for correctAnswer

    return guesses
      .map((guess) => {
        const generationEmoji = comparePokemonValue(
          correctAnswer.generation,
          guess.generation,
        );
        const weightEmoji = comparePokemonValue(
          correctAnswer.weight,
          guess.weight,
        );
        const heightEmoji = comparePokemonValue(
          correctAnswer.height,
          guess.height,
        );
        const typesEmoji = comparePokemonTypes(
          correctAnswer.types,
          guess.types,
        ).join("");
        return `${generationEmoji} ${typesEmoji} ${heightEmoji} ${weightEmoji}`;
      })
      .join("\n");
  };

  const handleShareClick = async (): Promise<void> => {
    const grid = createEmojiGrid();
    const textToCopy = `
Pokedexle ${mode} ${id} ${
      attempts > 0
        ? `${guesses.length}/${defaultGuesses}`
        : `X/${defaultGuesses}`
    }
${grid}
${window.location.href}
    `;

    try {
      await navigator.clipboard.writeText(textToCopy);
      alert("Grid copied to clipboard successfully!");
    } catch (error) {
      alert("Failed to copy grid: " + error);
    }
  };

  // If the game is not over or if correctAnswer is null, we won't render the Share button.
  if (!gameOver || !correctAnswer) {
    return null;
  }

  return (
    <Button onClick={handleShareClick} variant="flat" className="flex gap-2">
      <Icons.share className="h-5 w-5" />
      Share
    </Button>
  );
}
