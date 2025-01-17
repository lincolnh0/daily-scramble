"use client";
import {RefObject, useRef, useState} from "react";
import Cube from "@/utils/cube";
import CubeViewer2d from "@/components/cube-viewer-2d";
import CubeViewer3d from "@/components/cube-viewer-3d";

interface CubeViewerProps {
  scramble?: string[];
  scrambleCallback?: (move: string) => void;
  resetCallback?: () => void;
  dimensions?: number;
}

export default function CubeViewer({ dimensions = 2, scrambleCallback, resetCallback, scramble }: CubeViewerProps) {
  const cube: RefObject<Cube> = useRef(new Cube(scramble));
  const [cubeFaces, setCubeFaces] = useState(cube.current.cubeFaces);

  const renderRotation = (move: string) => {
    cube.current.rotateFace(move);
    const shallowCopy = JSON.parse(JSON.stringify(cube.current.cubeFaces));
    setCubeFaces(shallowCopy);
    if (scrambleCallback) {
      scrambleCallback(move);
    }
  }

  const resetCube = () => {
    cube.current = new Cube();
    setCubeFaces(cube.current.cubeFaces);
    if (resetCallback) {
      resetCallback();
    }
  }

  return dimensions === 2 ? (
      <CubeViewer2d cubeFaces={cubeFaces} rotationCallback={renderRotation} resetCallback={resetCube}/>
  ) : (
      <CubeViewer3d cubeFaces={cubeFaces} rotationCallback={renderRotation} resetCallback={resetCube}/>
  )
};