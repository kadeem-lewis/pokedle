import OptionsBar from "@/components/layout/OptionsBar";
import Gamebox from "@/components/core/Gamebox";
import { getPokedex } from "@/lib/pokemon";

export const metadata = {
  title: "Pokedexle | Classic",
  description: "Guess Pokemon based on hints from previous guesses",
};

export default async function Classic() {
  const { pokedex } = await getPokedex();
  return (
    <div>
      <OptionsBar />
      {pokedex && <Gamebox data={pokedex} />}
    </div>
  );
}
