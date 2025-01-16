import {Checkbox} from "@/components/ui/checkbox";


export default function VideoRequirements({readOnly: readOnly = false}) {

  const title = "The video contains the following:";
  const requirements = [
    "An initial display of the scramble",
    "A time keeping device",
    "A running stopwatch in the background",
  ];
  return readOnly ? (
      <div className="text-xs text-gray-500 px-2">
        <p>{title}</p>
        <ul className="list-disc p-2">
          {requirements.map((requirement, index) => (
              <li key={index} className={"mb-1"}>{requirement}</li>
          ))}
        </ul>
      </div>
  ): (
      <div className="text-sm  px-2 flex-col flex gap-4">
        <p>{title}</p>
        <ul className="flex flex-col gap-2">
          {requirements.map((requirement, index) => (
              <li key={index} className={"mb-1 flex gap-2"}>
                <Checkbox name={"requirement-" + index}/>
                <span>{requirement}</span>
              </li>
          ))}
        </ul>
      </div>
  )
}