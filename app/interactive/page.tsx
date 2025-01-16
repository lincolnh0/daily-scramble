"use client";
import CubeViewer from "@/components/cube-viewer";
import {useSearchParams} from 'next/navigation'
import { useState} from "react";
import Cube from "@/utils/cube";

export default function Interactive() {

  // const searchParams = useSearchParams();
  // const date = new Date(searchParams.get("date") ?? "");
  // const dateSeed = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
  const [scramble, setScramble] = useState<string[]>([]);

  const scrambleCallback = (move: string) => {
    setScramble([...scramble, move]);
  }

  return (
      <div className="flex flex-col justify-center gap-16 font-mono">
        <h1 className="lg:text-4xl md:text-2xl text-lg font-bold text-center">Interactive Cube</h1>
        {scramble && (
            <h2 className="lg:text-2xl md:text-xl text-md ">{scramble.join(" ")}</h2>
        )}
        <CubeViewer scramble={scramble} scrambleCallback={scrambleCallback} resetCallback={() => setScramble([])}/>
      </div>
  )


}
