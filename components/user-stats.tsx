import {CheckCheck, Play, Timer} from "lucide-react";
import {createClient} from "@/utils/supabase/server";

export default async function UserStats({user_id}: { user_id: string }) {
  const supabase = await createClient();

  const {
    data: solves,
    error: solves_error
  } = await supabase
      .schema("daily_scramble")
      .from("solves")
      .select("*")
      .eq("user", user_id);

  const {
    data: verifications,
    error: verifications_error
  } = await supabase
      .schema("daily_scramble")
      .from("verifications")
      .select("*")
      .eq("verifying_user", user_id);

  const totalSolveTime = solves?.reduce((acc, solve) => acc + solve.solve_time, 0);

  if (solves_error || verifications_error) {
    console.error(verifications_error);
  }

  return (
      <div className="flex-1 w-full flex flex-col gap-4 justify-between">
        <div className="flex border-2 shadow rounded-2xl p-8 gap-2 items-center justify-between">
          <Play/>
          <div className="flex gap-4 items-baseline">
            <span className="font-bold text-2xl">{solves?.length}</span>
            <span className="">Solves</span>
          </div>
        </div>
        <div className="flex border-2 shadow rounded-2xl p-8 gap-2 items-center justify-between">
          <Timer/>
          <div className="flex gap-4 items-baseline">
            <span className="font-bold text-2xl">{(totalSolveTime / (solves?.length || 1)).toFixed(2)} s</span>
            <span className="">Avg. time</span>
          </div>
        </div>
        <div className="flex border-2 shadow rounded-2xl p-8 gap-2 items-center justify-between">
          <CheckCheck/>
          <div className="flex gap-4 items-baseline">
            <span className="font-bold text-2xl">{verifications?.length}</span>
            <span className="">Verifications</span>
          </div>
        </div>
      </div>
  );
}