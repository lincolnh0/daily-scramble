import {filterLeaderboard, getLeaderboard} from "@/app/leaderboard/actions";
import {Button} from "@/components/ui/button";
import {Flag} from "lucide-react";
import Link from "next/link";
import Cube from "@/utils/cube";
import {Input} from "@/components/ui/input";

type LeaderboardProps = {
  date: string
}

export default async function Leaderboard(props: { searchParams: Promise<LeaderboardProps> }) {
  const searchParams = await props.searchParams;
  let scramble = searchParams.date ?? "";
  if (searchParams.date) {
    const date = new Date(searchParams.date);
    const dateSeed = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`
    scramble = Cube.generateScramble(dateSeed).join(" ");
  }
  const leaderboard = await getLeaderboard(scramble);


  return (
      <div className="flex flex-col justify-center font-mono gap-12 items-center">
        <h1 className="lg:text-4xl md:text-2xl text-lg font-bold text-center">Leaderboard</h1>
        <p className="text-xs md:text-sm uppercase">{scramble || "All time"}</p>
        <form className={"flex gap-4"}>
          <Input name="date-filter" type={"date"} defaultValue={searchParams.date}/>
          <Button formAction={filterLeaderboard} type={"submit"}>Filter</Button>
        </form>
        <div>
          <table className="table-auto w-full text-left font-sans">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className={"text-center"}>
              <th className="sm:px-2 md:px-4 lg:px-6 py-3">Rank</th>
              <th className="sm:px-2 md:px-4 lg:px-6 py-3">User</th>
              <th className="sm:px-2 md:px-4 lg:px-6 py-3">Time</th>
              <th className="sm:px-2 md:px-4 lg:px-6 py-3">Video</th>
              <th className="sm:px-2 md:px-4 lg:px-6 py-3">Report</th>
            </tr>
            </thead>
            <tbody>
            {leaderboard.map((entry, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-900">
                  <td className="sm:px-2 md:px-4 lg:px-6 py-4 text-center">{index + 1}</td>
                  <td className="sm:px-2 md:px-4 lg:px-6 py-4">{entry.profile.display_name}</td>
                  <td className="sm:px-2 md:px-4 lg:px-6 py-4">{entry.solve_time}s</td>
                  <td className="sm:px-2 md:px-4 lg:px-6 py-4">
                    <Link href={entry.video_url}>
                      <Button variant={"ghost"}>Watch</Button>
                    </Link>
                  </td>
                  <td className="sm:px-2 md:px-4 lg:px-6 py-4">
                    <Button variant={"ghost"}>
                      <Flag size={16}/>
                    </Button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}