"use client";
import CubeViewer from "@/components/cube-viewer";


export default function Interactive() {


  return (
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-20 text-center">Interactive Cube</h1>
        <CubeViewer showControls={true}/>
      </div>
  )


}
