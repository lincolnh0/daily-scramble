"use client";
import {RefObject, useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import Cube from "@/utils/cube";

export default function CubeViewer({scramble = []}: { scramble: string[] }) {
  const cube: RefObject<Cube> = useRef(new Cube());
  const [cubeFaces, setCubeFaces] = useState(cube.current.cubeFaces);


  useEffect(() => {
    cube.current.scramble(scramble);
    const shallowCopy = JSON.parse(JSON.stringify(cube.current.cubeFaces));
    setCubeFaces(shallowCopy);
  }, []);

  const renderRotation = (move: string) => {
    cube.current.rotateFace(move);
    const shallowCopy = JSON.parse(JSON.stringify(cube.current.cubeFaces));
    setCubeFaces(shallowCopy);
  }
  const [currentFace, setCurrentFace] = useState("F");

  const navigateFace = (direction: string) => {
    setCurrentFace(direction);
  }

  return (
      <div className="flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 bg-black p-4">
            {cubeFaces["B"].slice(0).reverse().map((grid, i) => (
                <div key={i} className="flex gap-2">
                  {grid.slice(0).reverse().map((cell, j) => (
                      <div
                          key={j}
                          className="w-6 h-6"
                          style={{
                            backgroundColor: cube.current.faceColours[cell],
                          }}
                      />
                  ))}
                </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 bg-black p-4">
            {cubeFaces["U"].map((grid, i) => (
                <div key={i} className="flex gap-2">
                  {grid.map((cell, j) => (
                      <div
                          key={j}
                          className="w-6 h-6"
                          style={{
                            backgroundColor: cube.current.faceColours[cell],
                          }}
                      />
                  ))}
                </div>
            ))}
          </div>
          <div className="flex">

            <div className="flex flex-col gap-2 bg-black p-4">
              {cubeFaces["L"].map((grid, i) => (
                  <div key={i} className="flex gap-2">
                    {grid.map((cell, j) => (
                        <div
                            key={j}
                            className="w-6 h-6"
                            style={{
                              backgroundColor: cube.current.faceColours[cell],
                            }}
                        />
                    ))}
                  </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 bg-black p-4">
              {cubeFaces["F"].map((grid, i) => (
                  <div key={i} className="flex gap-2">
                    {grid.map((cell, j) => (
                        <div
                            key={j}
                            className="w-6 h-6 "
                            style={{
                              backgroundColor: cube.current.faceColours[cell],
                            }}
                        />
                    ))}
                  </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 bg-black p-4">
              {cubeFaces["R"].map((grid, i) => (
                  <div key={i} className="flex gap-2">
                    {grid.map((cell, j) => (
                        <div
                            key={j}
                            className="w-6 h-6"
                            style={{
                              backgroundColor: cube.current.faceColours[cell],
                            }}
                        />
                    ))}
                  </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-black p-4">
            {cubeFaces["D"].map((grid, i) => (
                <div key={i} className="flex gap-2">
                  {grid.map((cell, j) => (
                      <div
                          key={j}
                          className="w-6 h-6"
                          style={{
                            backgroundColor: cube.current.faceColours[cell],
                          }}
                      />
                  ))}
                </div>
            ))}
          </div>
        </div>

      </div>
  );
};