import Hero from "@/components/hero";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
      <>
        <Hero/>
        <main className="flex-1 flex gap-6 px-4 justify-center font-mono">
          <Link
              href={"/leaderboard"}>
            <Button>
              LEADERBOARD
            </Button>
          </Link>
          <Link href={"/submit"}>
            <Button>
              SUBMIT TIME
            </Button>
          </Link>
        </main>
      </>
  );
}
