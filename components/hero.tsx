import CubeViewer2d from "@/components/cube-viewer-2d";
import Cube from "@/utils/cube";
import CubeViewer from "@/components/cube-viewer";

export default function Header() {
  const scramble = Cube.generateScramble("", true);

  return (
      <div className="flex flex-col gap-16 items-center font-mono">
        <h1 className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center font-bold">{new Date().toDateString().split(" ").slice(1).join(" ")}</h1>
        <div className="flex flex-col gap-4 items-center text-center">
          <p className="text-lg lg:text-xl ">{scramble.join(" ")}</p>
        </div>
        <CubeViewer scramble={scramble.filter(value => value !== "-")}/>
        <p className={"text-gray-500 italic text-sm"}>The above scramble assumes the initial position of white face on top, green face on the front.</p>
      </div>
  );
}
