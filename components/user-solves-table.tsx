import {BadgeCheck, X} from "lucide-react"
import Link from "next/link";

export default function UserSolvesTable({solves = []}: { solves: any[] | null }) {
  return (
      <div className="overflow-x-scroll">
        <span className="sm:hidden">Only available on a larger screen</span>
        <table className="hidden sm:block table-fixed text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="sm:px-2 md:px-4 lg:px-6 py-3">Date</th>
            <th scope="col" className="sm:px-2 md:px-4 lg:px-6 py-3">Time</th>
            <th scope="col" className="sm:px-2 md:px-4 lg:px-6 py-3">Scramble</th>
            <th scope="col" className="sm:px-2 md:px-4 lg:px-6 py-3">Video</th>
            <th scope="col" className="sm:px-2 md:px-4 lg:px-6 py-3">Public</th>
          </tr>
          </thead>
          <tbody>
          {solves?.map((solve) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-900" key={solve.id}>
                <td className="sm:px-2 md:px-4 lg:px-6 py-4">{solve.created_at.split("T")[0]}</td>
                <td className="sm:px-2 md:px-4 lg:px-6 py-4">{solve.solve_time}s</td>
                <td className="sm:px-2 md:px-4 lg:px-6 py-4">
                  {solve.scramble}
                </td>
                <td className="sm:px-2 md:px-4 lg:px-6 py-4">
                  {solve.video_url ? (
                      <Link href={solve.video_url} target="_blank" rel="noreferrer">
                        Watch
                      </Link>
                  ) : null}
                </td>
                <td className="sm:px-2 md:px-4 lg:px-6 py-4 flex justify-center items-center">
                  {solve.public ? <BadgeCheck/> : <X/>}

                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>)
}