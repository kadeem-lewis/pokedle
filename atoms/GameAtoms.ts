import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { useAtomsDebugValue } from "jotai-devtools";

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  generation: number;
  sprite: string;
}
export interface Move {
  name: string;
  power: number;
  pp: number;
  type: string;
  class: string;
  accuracy: number;
}

//TODO: have atom that stores the pokemon collection

//TODO: have atom that connects to localstorage and stores all the game stats

//?: Maybe each game type should have its own atom so that the current results for each game mode is saved between sessions. It needs to check

//!: Should probably keep the whole atom responsible for resetting everything and making a new game

export function chooseRandomItem(itemArray: Pokemon[]): Pokemon {
  const itemNumber = Math.floor(Math.random() * itemArray.length);
  return itemArray[itemNumber];
}

//gets the array of pokemon from prisma
export const pokedexAtom = atom<Pokemon[]>([]);
pokedexAtom.debugLabel = "pokedexAtom";

//the number of guesses a user has
//? should a setter or derived atom or something be updating the guesses state?
export const guessAtom = atom(8);
guessAtom.debugLabel = "guessAtom";

//selects a pokemon from that array to be the pokemon to guess. Derived readable atom of pokedex
export const pokemonToGuessAtom = atom<Pokemon>((get) =>
  chooseRandomItem(get(pokedexAtom))
);
pokemonToGuessAtom.debugLabel = "pokemonToGuessAtom";

//atom that is responsible for saying if the game is over or not
export const gameOverAtom = atom(false);
gameOverAtom.debugLabel = "gameOverAtom";

//derived writable atom that is attempting to reset all values back to their defaults
//? It doesnt take any params
//? This resets the value specified but it doesnt have a way to reset the derived pokemonToGuess Atom
export const newGameAtom = atom(null, (get, set) => {
  set(guessedItemsAtom, []);
  set(guessAtom, 8);
  set(gameOverAtom, false);
});
newGameAtom.debugLabel = "newGameAtom";

//atom that stores the pokemon that have been guessed
export const guessedItemsAtom = atom<Pokemon[]>([]);
guessedItemsAtom.debugLabel = "guessedItemsAtom";

//derived writable atom that adds the value passed into the guessed item array
//? Could have write function take in a key to specify which array to add item to
export const addGuessedItemAtom = atom(null, (get, set, newItem: Pokemon) => {
  const array = get(guessedItemsAtom);
  set(guessedItemsAtom, [...get(guessedItemsAtom), newItem]);
});
addGuessedItemAtom.debugLabel = "addGuessedItemAtom";
