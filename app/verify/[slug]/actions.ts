"use server";

import {createClient} from "@/utils/supabase/server";
import {encodedRedirect} from "@/utils/utils";
import {redirect} from "next/navigation";

export const getUnverifiedSolve = async () => {
  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser();

  // TODO: Weighted ordering sequence for solves
  // - dates
  // - number of verifications done by solve author

  const {
    data: verifications,
  } = await supabase
      .schema("daily_scramble")
      .from("verifications")
      .select("*")
      .eq("verifying_user", user?.id);

  const verifiedSolveIds = verifications?.map((verification) => verification.solve_id) ?? [];

  const {
    data: solve,
    error: solveError,
  } = await supabase
      .schema("daily_scramble")
      .from("solves")
      .select("*")
      .neq("user", user?.id)
      .eq("public", true)
      .not("id", "in", `(${verifiedSolveIds.join(",")})`)
      .order("created_at", {ascending: false})
      .limit(1)
      .single()

  return {
    solve,
    solveError,
  }
}

export const approveSolve = async (solveId: string, formData: FormData) => {
  const supabase = await createClient();

  const {data: {user}} = await supabase.auth.getUser();

  const {error} = await supabase.schema("daily_scramble").from("verifications").insert({
    verifying_user: user?.id,
    solve_id: Number(solveId),
    is_legit: true,
  });

  if (error) {
    return encodedRedirect("error", "/verify/" + solveId, "Something went wrong, please try again.");
  }

  const {solve, solveError} = await getUnverifiedSolve();

  if (solveError) {
    return redirect("/verify");
  }

  return encodedRedirect("success", "/verify/" + solve.id, "Solve has been successfully verified.");

};

export const rejectSolve = async (solveId: string, formData: FormData) => {
  const supabase = await createClient();

  const {data: {user}} = await supabase.auth.getUser();

  const {error} = await supabase.schema("daily_scramble").from("verifications").insert({
    verifying_user: user?.id,
    solve_id: Number(solveId),
    is_legit: false,
  });

  if (error) {
    return encodedRedirect("error", "/verify/" + solveId, "Something went wrong, please try again.");
  }

  const {solve, solveError} = await getUnverifiedSolve();

  if (solveError) {
    return redirect("/verify");
  }

  return encodedRedirect("success", "/verify/" + solve.id, "Solve has been rejected.");

};