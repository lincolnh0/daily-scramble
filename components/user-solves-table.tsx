import {BadgeCheck, X} from "lucide-react"
import Link from "next/link";

export default function UserSolvesTable({solves = []}: { solves: any[] | null }) {
  return (
      <table className="table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">Date</th>
          <th scope="col" className="px-6 py-3">Time</th>
          <th scope="col" className="px-6 py-3">Scramble</th>
          <th scope="col" className="px-6 py-3">Video</th>
          <th scope="col" className="px-6 py-3">Verified</th>
        </tr>
        </thead>
        <tbody>
        {solves?.map((solve) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={solve.id}>
              <td scope="row"
                  className="px-6 py-4">{solve.created_at.split("T")[0]}</td>
              <td className="px-6 py-4">{solve.solve_time}</td>
              <td className="px-6 py-4">
                {solve.scramble}
              </td>
              <td className="px-6 py-4">
                {solve.video_url ? (
                    <Link href={solve.video_url} target="_blank" rel="noreferrer">
                      Watch
                    </Link>
                ) : null}
              </td>
              {solve.verified ? (<td className="px-6 py-4 text-blue-500"><BadgeCheck/></td>) : (
                  <td className="px-6 py-4"><X/></td>)}
            </tr>
        ))}
        </tbody>
      </table>)
}