import { Pokemon } from "@/atoms/GameAtoms";
import Image from "next/image";
import { Tile, TileContent } from "../ui/Tile";
import { hectogramToImperial } from "@/helpers/Conversions";

type FeedbackTileProps = {
  guessedItem: Pokemon;
  correctItem: Pokemon;
};
export default function FeedbackTile({
  guessedItem,
  correctItem,
}: FeedbackTileProps) {
  //TODO: find a way to have the pokemon images scale to the size of the container so smaller characters arent barely visible
  //TODO: increase the size of the grid and have each box have a defined size and have them be in a vertical scrollable container

  function checkTypes(type: string): JSX.Element {
    if (correctItem.types.includes(type)) {
      return (
        <Tile status="correct" key={type}>
          <TileContent>{type}</TileContent>
        </Tile>
      );
    }
    return (
      <Tile status="incorrect" key={type}>
        <TileContent>{type}</TileContent>
      </Tile>
    );
  }

  return (
    <div className="flex gap-x-1">
      {guessedItem.name === correctItem.name ? (
        <>
          <Tile status="correct">
            <TileContent>
              <Image
                src={guessedItem.sprite}
                alt={`${guessedItem.name} sprite`}
                priority={true}
                width={100}
                height={100}
              />
            </TileContent>
          </Tile>
          <Tile status="correct">
            <TileContent>Gen {correctItem.generation}</TileContent>
          </Tile>
          {correctItem.types.map((type) => (
            <Tile key={type} status="correct">
              <TileContent>{type}</TileContent>
            </Tile>
          ))}
          <Tile status="correct">
            <TileContent>{hectogramToImperial(correctItem.weight)}</TileContent>
          </Tile>
          <Tile status="correct">
            <TileContent>{correctItem.height / 10}m</TileContent>
          </Tile>
        </>
      ) : (
        <>
          <Tile>
            <TileContent>
              <Image
                src={guessedItem.sprite}
                alt={`${guessedItem.name} sprite`}
                priority={true}
                width={100}
                height={100}
              />
            </TileContent>
          </Tile>

          {guessedItem.generation === correctItem.generation ? (
            <Tile status="correct">
              <TileContent>Gen {correctItem.generation}</TileContent>
            </Tile>
          ) : (
            <Tile
              status="incorrect"
              difference={
                guessedItem.generation > correctItem.generation
                  ? "lower"
                  : "higher"
              }
            >
              <TileContent>Gen {guessedItem.generation}</TileContent>
            </Tile>
          )}
          {guessedItem.types.map((type) => checkTypes(type))}
          {guessedItem.height === correctItem.height ? (
            <Tile status="correct">
              <TileContent>{correctItem.height / 10}m</TileContent>
            </Tile>
          ) : (
            <Tile
              status="incorrect"
              difference={
                guessedItem.height > correctItem.height ? "lower" : "higher"
              }
            >
              <TileContent>{guessedItem.height / 10}m</TileContent>
            </Tile>
          )}
          {guessedItem.weight === correctItem.weight ? (
            <Tile status="correct">
              <TileContent>
                {hectogramToImperial(correctItem.weight)}
              </TileContent>
            </Tile>
          ) : (
            <Tile
              status="incorrect"
              difference={
                guessedItem.weight > correctItem.weight ? "lower" : "higher"
              }
            >
              <TileContent>
                {hectogramToImperial(correctItem.weight)}
              </TileContent>
            </Tile>
          )}
        </>
      )}
    </div>
  );
}