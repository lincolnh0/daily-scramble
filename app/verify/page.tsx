import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import Link from "next/link";
import {getUnverifiedSolve} from "@/app/verify/[slug]/actions";


export default async function Verify() {

  const {solve, solveError} = await getUnverifiedSolve();
  return (
      <div className="flex flex-col justify-center items-center max-w-2xl gap-12 font-mono">
        <h1 className="text-3xl lg:text-4xl font-bold mb-10 text-center">Community verification</h1>
        <div className={"flex flex-col gap-2"}>
          <p>
            The daily scramble runs on a community approval system. Here you can help verify the legitimacy other
            solves.
          </p>
          <p>
            Only solves above a certain threshold will be shown on the leaderboard.
          </p>
          <p>
            The more you help verify, the quicker your own solves will be verified by others.
          </p>
        </div>
        {solveError ?
            <p className={"text-destructive"}>There are no solves to verify at the moment. Please check back later.</p> :
            <Link href={"/verify/" + solve.id}>
              <Button size={"lg"} className={"mt-8 uppercase flex gap-2 text-md"}>
                Get started
                <ArrowRight/>
              </Button>
            </Link>
        }

      </div>
  )
}