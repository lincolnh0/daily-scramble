"use client";
import {RefObject, useRef, useState} from "react";
import Cube from "@/utils/cube";
import CubeViewer2d from "@/components/cube-viewer-2d";
import CubeViewer3d from "@/components/cube-viewer-3d";
import CubeControls from "@/components/cube-controls";

interface CubeViewerProps {
  scramble?: string[];
  rotationCallback?: (move: string) => void;
  resetCallback?: () => void;
}

export default function CubeViewer({rotationCallback, resetCallback, scramble}: CubeViewerProps) {
  const cube: RefObject<Cube> = useRef(new Cube(scramble));
  const [cubeFaces, setCubeFaces] = useState(cube.current.cubeFaces);

  const [dimension, setDimension] = useState(2);

  const renderRotation = (move: string) => {
    cube.current.rotateFace(move);
    const shallowCopy = JSON.parse(JSON.stringify(cube.current.cubeFaces));
    setCubeFaces(shallowCopy);
    if (rotationCallback) {
      rotationCallback(move);
    }
  }

  const resetCube = () => {
    cube.current = new Cube();
    setCubeFaces(cube.current.cubeFaces);
    if (resetCallback) {
      resetCallback();
    }
  }

  return (
      <div className={"flex flex-col items-center"}>
        {dimension === 2 ? (
            <CubeViewer2d cubeFaces={cubeFaces}/>
        ) : (
            <CubeViewer3d cubeFaces={cubeFaces} rotationCallback={renderRotation} resetCallback={resetCube}/>
        )}
        {resetCallback && rotationCallback && (
            <CubeControls rotationCallback={renderRotation} resetCallback={resetCube}/>
        )}
      </div>
  )
};