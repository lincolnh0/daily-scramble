import {Button} from "@/components/ui/button";

interface CubeControlsProps {
  rotationCallback: (move: string) => void;
  resetCallback: () => void;
}

export default function CubeControls({rotationCallback, resetCallback}: CubeControlsProps) {
  return (
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