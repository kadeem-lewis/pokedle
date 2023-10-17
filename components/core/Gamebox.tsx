"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Tab } from "@headlessui/react";
import { useHydrateAtoms } from "jotai/utils";
import {
  Pokemon,
  pokedexAtom,
  pokemonToGuessAtom,
  currentGameMode,
  classicPracticeAnswersAtom,
  guessedItemsAtom,
  guessAtom,
  classicAnswersAtom,
  dailyAtom,
  dailyPokemonAtom,
} from "@/atoms/GameAtoms";
import { defaultGuesses } from "@/constants";
import MyComboBox from "../ui/MyComboBox";
import PokemonTypes from "./PokemonTypes";
import PokemonFeedback from "./PokemonFeedback";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { Button } from "../ui/Button";
import { isSameDay, startOfDay, subMinutes } from "date-fns";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export default function Gamebox({ pokedex }: { pokedex: Pokemon[] }) {
  useHydrateAtoms([[pokedexAtom, pokedex]]);
  const pokemonToGuess = useAtomValue(pokemonToGuessAtom);
  const classicPracticeAnswers = useAtomValue(classicPracticeAnswersAtom);
  const [guessedItems, setGuessedItems] = useAtom(guessedItemsAtom);
  const setGuesses = useSetAtom(guessAtom);
  const [mode, setMode] = useAtom(currentGameMode);
  const { date, classicId } = useAtomValue(dailyAtom);
  const [classicAnswers, setClassicAnswers] = useAtom(classicAnswersAtom);
  const setDailyPokemon = useSetAtom(dailyPokemonAtom);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentPath = usePathname();

  useEffect(() => {
    if (currentPath === "/classic" && selectedIndex === 0) setMode("classic");
  }, [currentPath, selectedIndex, setMode]);

  useEffect(() => {
    function setDailies() {
      const dailyClassicPokemon = pokedex.find(
        (pokemon) => pokemon.id === classicId,
      );
      if (!dailyClassicPokemon) throw new Error("Daily Pokemon Not Found");

      setDailyPokemon((prev) => ({ ...prev, classic: dailyClassicPokemon }));
    }
    setDailies();
  }, [classicId, pokedex, setDailyPokemon]);

  useEffect(() => {
    if (mode !== "classic") return;
    if (isSameDay(new Date(classicAnswers.date), new Date(date))) {
      setGuessedItems((prev) => ({
        ...prev,
        classic: classicAnswers.answers,
      }));
      setGuesses((prev) => ({
        ...prev,
        classic: defaultGuesses - classicAnswers.answers.length,
      }));
    } else {
      setClassicAnswers({
        date: subMinutes(
          startOfDay(new Date()),
          startOfDay(new Date()).getTimezoneOffset(),
        ),
        answers: [],
      });
    }
  }, [
    classicAnswers.date,
    classicAnswers.answers,
    date,
    guessedItems.classic.length,
    mode,
    setClassicAnswers,
    setGuessedItems,
    setGuesses,
  ]);

  useEffect(() => {
    if (
      classicPracticeAnswers !== null &&
      mode === "classicUnlimited" &&
      guessedItems.classicUnlimited.length === 0
    ) {
      setGuessedItems((prev) => ({
        ...prev,
        classicUnlimited: classicPracticeAnswers,
      }));
      setGuesses((prev) => ({
        ...prev,
        classicUnlimited: defaultGuesses - classicPracticeAnswers.length,
      }));
    }
  }, [
    mode,
    classicPracticeAnswers,
    setGuessedItems,
    setGuesses,
    guessedItems.classicUnlimited,
  ]);

  return (
    <>
      <Tab.Group
        selectedIndex={selectedIndex}
        onChange={(index) => {
          setSelectedIndex(index);
          if (index === 0) {
            setMode("classic");
          } else {
            setMode("classicUnlimited");
          }
        }}
      >
        <Tab.List className="mt-2 flex justify-center gap-2">
          <Tab
            className="bg-yellow-500 ui-selected:brightness-110 ui-not-selected:brightness-75"
            as={Button}
            variant="flat"
            size="tall"
          >
            Daily
          </Tab>
          <Tab
            className="bg-yellow-500 ui-selected:brightness-110 ui-not-selected:brightness-75"
            as={Button}
            variant="flat"
            size="tall"
          >
            Unlimited
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {pokemonToGuess.classic && (
              <PokemonFeedback correctAnswer={pokemonToGuess.classic} />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {pokemonToGuess.classicUnlimited && (
              <PokemonFeedback
                correctAnswer={pokemonToGuess.classicUnlimited}
              />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <MyComboBox />
      <PokemonTypes />
    </>
  );
}
