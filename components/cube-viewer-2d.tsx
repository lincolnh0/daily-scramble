"use client";
import Cube from "@/utils/cube";
import {Button} from "@/components/ui/button";

interface CubeViewerProps {
  cubeFaces: { [key: string]: string[][] };
  rotationCallback: (move: string) => void;
  resetCallback?: () => void;
}

export default function CubeViewer2d({cubeFaces, rotationCallback, resetCallback}: CubeViewerProps) {

  const renderFace = (face: string, reverse: boolean = false) => {
    const cubeFace = reverse ? cubeFaces[face].slice(0).reverse() : cubeFaces[face];
    return (
        cubeFace.map((grid, i) => (
            <div key={i} className="flex gap-2">
              {(reverse ? grid.slice(0).reverse() : grid).map((cell, j) => (
                  <div
                      key={j}
                      className="w-5 h-5"
                      style={{
                        backgroundColor: Cube.faceColours[cell],
                      }}
                  />
              ))}
            </div>
        )))
  }

  return (
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 bg-black p-4">
            {renderFace("B", true)}
          </div>
          <div className="flex flex-col gap-2 bg-black p-4">
            {renderFace("U")}
          </div>
          <div className="flex">

            <div className="flex flex-col gap-2 bg-black p-4">
              {renderFace("L")}
            </div>

            <div className="flex flex-col gap-2 bg-black p-4">
              {renderFace("F")}
            </div>

            <div className="flex flex-col gap-2 bg-black p-4">
              {renderFace("R")}
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-black p-4">
            {renderFace("D")}
          </div>
        </div>
        {rotationCallback && (
            <div className="flex flex-col gap-4 justify-center mt-20 w-fit items-center">
              {["R", "L", "U", "D", "F", "B"].map((face) => (
                  <div key={face} className="flex gap-4 justify-center">
                    <Button className={"w-12"} onClick={() => rotationCallback(`${face}`)}>{face}</Button>
                    <Button className={"w-12"} onClick={() => rotationCallback(`${face}'`)}>{face}'</Button>
                    <Button className={"w-12"} onClick={() => rotationCallback(`${face}2`)}>{face}2</Button>
                  </div>
              ))}
              <Button className={"w-full"} onClick={resetCallback}>Reset</Button>
            </div>
        )
        }
      </div>
  );
};