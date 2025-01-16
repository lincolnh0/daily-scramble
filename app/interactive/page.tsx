"use client";
import CubeViewer from "@/components/cube-viewer";
import {useSearchParams} from 'next/navigation'
import { useState} from "react";
import {Button} from "@/components/ui/button";

export default function Interactive() {

  const searchParams = useSearchParams();

  const [scramble, setScramble] = useState<string[]>(JSON.parse(searchParams.get("scramble") ?? "[]"));

  const scrambleCallback = (move: string) => {
    setScramble([...scramble, move]);
  }

  return (
      <div className="flex flex-col justify-center gap-10 font-mono">
        <h1 className="lg:text-4xl md:text-2xl text-lg font-bold text-center">Interactive Cube</h1>
        {scramble && (
            <h2 className="lg:text-2xl md:text-xl text-md ">{scramble.join(" ")}</h2>
        )}
        <CubeViewer scramble={scramble} scrambleCallback={scrambleCallback} resetCallback={() => setScramble([])}/>
      </div>
  )


}
