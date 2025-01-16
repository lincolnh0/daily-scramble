import {MonitorCheck, Play, Timer, Trophy} from "lucide-react";
import {createClient} from "@/utils/supabase/server";

export default async function UserStats({user_id}: { user_id: string }) {
  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser();

  const solveQuery = supabase
      .schema("daily_scramble")
      .from("solves")
      .select("*")
      .eq("user", user_id)
      .order("created_at", {ascending: false});

  if (user_id !== user?.id) {
    solveQuery.eq("public", true);
  }

  const {
    data: solves,
    error: solves_error
  } = await solveQuery;

  const {
    data: verifications,
    error: verifications_error
  } = await supabase
      .schema("daily_scramble")
      .from("verifications")
      .select("*")
      .eq("verifying_user", user_id);

  const fastestSolve = solves?.sort((a, b) => a.solve_time - b.solve_time).map((solve) => solve.solve_time)[0];
  if (solves_error || verifications_error) {
    console.error(verifications_error);
  }

  return (
      <div className="flex-1 w-full flex flex-col gap-4 justify-between">
        <div className={"flex flex-col sm:flex-row gap-4"}>
          <div className="flex flex-1 border-2 shadow rounded-2xl p-8 gap-2 items-center justify-between">
            <Play/>
            <div className="flex lg:gap-4 gap-2 items-baseline">
              <span className="lg:text-md text-sm">Total Solves</span>
              <span className="font-bold lg:text-2xl text-lg">{solves?.length}</span>
            </div>
          </div>
          <div className="flex flex-1 border-2 shadow rounded-2xl p-8 gap-2 items-center justify-between">
            <Timer/>
            <div className="flex lg:gap-4 gap-2 items-baseline">
              <span className="lg:text-md text-sm">Fastest time</span>
              <span className="font-bold lg:text-2xl text-lg">{fastestSolve} s</span>
            </div>
          </div>
        </div>
        <div className={"flex flex-col sm:flex-row gap-4"}>
          <div className="flex-1 flex border-2 shadow rounded-2xl p-8 gap-2 items-center justify-between">
            <Trophy/>
            <div className="flex lg:gap-4 gap-2 items-baseline">
              <span className="lg:text-md text-sm">Top ranked solve</span>
              <span className="font-bold lg:text-2xl text-lg">Pending</span>
            </div>
          </div>
          <div className="flex-1 flex border-2 shadow rounded-2xl p-8 gap-2 items-center justify-between">
            <MonitorCheck/>
            <div className="flex lg:gap-4 gap-2 items-baseline">
              <span className="lg:text-md text-sm">Solves verified</span>
              <span className="font-bold lg:text-2xl text-lg">{verifications?.length}</span>
            </div>
          </div>
        </div>
      </div>
  );
}