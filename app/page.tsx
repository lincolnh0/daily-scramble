import Hero from "@/components/hero";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
      <>
        <Hero/>
        <main className="flex-1 flex gap-6 px-4 justify-center">
          <Link href={"/submit"} >
            <Button className={"text-md px-6 py-8 rounded-lg font-mono"}>
              SUBMIT TIME
            </Button>
          </Link>
        </main>
      </>
  );
}
