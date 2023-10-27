import LinkCard from "@/components/ui/LinkCard";
const NAV_LINKS = [
  {
    title: "Classic",
    description: "Guess the Pokémon",
    path: "/classic",
    background: "images/endless-constellation.svg",
  },
  {
    title: "Who's that Pokémon?",
    description: "Guess the Pokémon based on the image",
    path: "/whosthatpokemon",
    background: "/images/hollowed-boxes.svg",
  },
  {
    title: "Guess the Move",
    description: "Guess the Move",
    path: "/move",
    background: "/images/dragon-scales.svg",
  },
];
export default function Home() {
  return (
    <div>
      <p className="text-2xl">Test your Pokémon Knowledge</p>
      {NAV_LINKS.map((link) => (
        <LinkCard
          title={link.title}
          description={link.description}
          path={link.path}
          background={link.background}
          key={link.title}
        />
      ))}
    </div>
  );
}