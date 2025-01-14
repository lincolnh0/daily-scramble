"use client";
import {RefObject, useRef, useState} from "react";
import Cube from "@/utils/cube";
import {Button} from "@/components/ui/button";

interface CubeViewerProps {
  scramble?: string[];
  showControls?: boolean;
}

export default function CubeViewer({scramble, showControls}: CubeViewerProps) {
  const cube: RefObject<Cube> = useRef(new Cube(scramble));
  const [cubeFaces, setCubeFaces] = useState(cube.current.cubeFaces);

  const renderRotation = (move: string) => {
    cube.current.rotateFace(move);
    const shallowCopy = JSON.parse(JSON.stringify(cube.current.cubeFaces));
    setCubeFaces(shallowCopy);
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
        {showControls && (
            <div className="flex flex-col gap-4 justify-center mt-20">
              {["R", "L", "U", "D", "F", "B"].map((face) => (
                  <div key={face} className="flex gap-4 justify-center">
                    <Button onClick={() => renderRotation(`${face}`)}>{face}</Button>
                    <Button onClick={() => renderRotation(`${face}'`)}>{face}'</Button>
                    <Button onClick={() => renderRotation(`${face}2`)}>{face}2</Button>
                  </div>
              ))}
            </div>
        )
        }
      </div>
  );
};