"use client";

interface CubeViewerProps {
  cubeFaces: { [key: string]: string[][] };
  rotationCallback: (move: string) => void;
  resetCallback?: () => void;
}

export default function CubeViewer3d({cubeFaces, rotationCallback, resetCallback}: CubeViewerProps) {

  return null
};