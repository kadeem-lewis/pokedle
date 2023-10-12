import React from "react";
import Link from "next/link";
interface Props {
  title: string;
  description: string;
  path: string;
  background: string;
}
export default function LinkCard({
  title,
  description,
  path,
  background,
}: Props) {
  return (
    <div
      className="outline-3 my-6 rounded-lg border-4 border-amber-300 text-white outline outline-black dark:border-amber-500 dark:outline-white"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="h-full w-full bg-white/10 p-4">
        <Link href={path}>
          <p className="text-shadow text-3xl uppercase drop-shadow-md">
            {title}
          </p>
          <p className="text-shadow text-2xl">{description}</p>
        </Link>
      </div>
    </div>
  );
}
