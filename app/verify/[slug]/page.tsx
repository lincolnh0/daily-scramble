import {createClient} from "@/utils/supabase/server";
import VideoRequirements from "@/components/video-requirements";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowRight, Check, X} from "lucide-react";
import {FormMessage, Message} from "@/components/form-message";
import {redirect} from "next/navigation";
import {approveSolve, rejectSolve} from "@/app/verify/[slug]/actions";


export default async function VerifySolve({params, searchParams}: {
  params: Promise<{ slug: string }>,
  searchParams: Promise<Message>
}) {

  const message = await searchParams;

  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser();
  const solveId = (await params).slug

  const {
    data: solve,
    error: solveError,
  } = await supabase
      .schema("daily_scramble")
      .from("solves")
      .select("*")
      .eq("id", solveId)
      .single();

  if (solveError || solve.user === user?.id) {
    return redirect("/error")
  }

  const videoID = solve?.video_id;
  const videoUrl = `https://www.youtube.com/embed/${videoID}?controls=0`;

  const interactiveParams = {
    pathname: "/interactive",
    query: {
      date: solve.created_at.split("T")[0],
    },
  };

  const approveSolveWithId = approveSolve.bind(null, solveId);
  const rejectSolveWithId = rejectSolve.bind(null, solveId);

  return (
      <div className="flex flex-1 flex-col justify-center items-center gap-12 font-mono">

        <FormMessage message={message}/>
        <h1 className="lg:text-4xl md:text-2xl text-lg font-bold text-center ">Solve #{solve.id}</h1>
        <div className={"flex flex-col gap-8 justify-center items-center"}>
          <h2 className="lg:text-2xl md:text-xl text-md ">{solve.scramble}</h2>
          <Link href={interactiveParams}>
            <Button>
              View <ArrowRight/>
            </Button>
          </Link>

        </div>
        <div className="flex flex-col gap-10 w-full">
          <iframe className={"aspect-video"} src={videoUrl}/>

              <form className="flex flex-col gap-4 w-full">
                  <VideoRequirements readOnly={false}/>
                  <div className="flex gap-2 justify-center py-6">
                      <Button size={"lg"}
                              type={"submit"}
                              data-umami-event={"Reject solve"}
                              formAction={rejectSolveWithId}
                              className={"flex-1 uppercase text-white shadow-lg flex gap-2 text-md bg-red-500 hover:bg-red-400 hover:font-bold"}>
                          <X/>
                      </Button>
                      <Button size={"lg"}
                              type={"submit"}
                              data-umami-event={"Approve solve"}
                              formAction={approveSolveWithId}
                              className={"flex-1 uppercase text-white shadow-lg flex gap-2 text-md bg-green-500 hover:bg-green-400 hover:font-bold"}>
                          <Check/>
                      </Button>

                  </div>
              </form>

        </div>
      </div>
  )
}