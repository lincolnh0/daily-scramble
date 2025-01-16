"use server"

import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

const MINIMUM_VERIFICATIONS = 0;
const VERIFICATION_THRESHOLD = 0.6;

export const getLeaderboard = async (scramble: string) => {
  const supabase = await createClient();

  const query = supabase
      .schema("daily_scramble")
      .from("solves")
      .select("*, verifications!inner(*)")
      .eq("public", true)

  if (scramble) {
    query.eq("scramble", scramble)
  }

  const {
    data: dateSolves,
    error: dateSolvesError,
  } = await query.order("solve_time", {ascending: true}).limit(50);

  if (dateSolvesError) {
    console.error(dateSolvesError);
  }

  // Quick filter functions to get verified solves and solves above the verification threshold.
  const verifiedSolves = dateSolves?.filter((solve: any) => solve.verifications.length >= MINIMUM_VERIFICATIONS) ?? [];
  const aboveThresholdSolves = verifiedSolves.filter((solve: any) => {
    const positiveVerifications: number = solve.verifications.reduce((acc: number, verification: any) => {
      return verification.is_legit ? acc + 1 : acc
    }, 0);
    const negativeVerifications = solve.verifications.length - positiveVerifications;
    return positiveVerifications / (positiveVerifications + negativeVerifications) > VERIFICATION_THRESHOLD;
  });

  const {
    data: profiles,
    error: profilesError,
  } = await supabase
      .schema("daily_scramble")
      .from("profiles")
      .select("*")
      .in("user", aboveThresholdSolves.map((solve: any) => solve.user));

  if (profilesError) {
    console.error(profilesError);
  }

  return aboveThresholdSolves.map((solve: any) => {
    const profile = profiles?.find((profile: any) => profile.user === solve.user);
    return {
      ...solve,
      profile: profile,
    }
  })
}

export const filterLeaderboard = async (formData: FormData) => {
  const filterDate = formData.get("date-filter")?.toString();
  return redirect("/leaderboard?date=" + filterDate);
};
