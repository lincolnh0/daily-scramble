"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import Cube from "@/utils/cube";

export const submitSolve = async (formData: FormData) => {
  const supabase = await createClient();

  const solveTime = formData.get("solve-time");
  const scramble = Cube.generateScramble().join("");
  const videoUrl = formData.get("video-url")?.toString();

  if (videoUrl && !videoUrl?.includes("youtube.com") && !videoUrl?.includes("youtu.be")) {
    return encodedRedirect("error", "/submit", "Please provide a valid YouTube video URL.");
  }

  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase.schema("daily_scramble").from("solves").insert([{
    solve_time: solveTime,
    scramble: scramble,
    video_url: videoUrl,
    user: user?.id,
  }]);

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/submit", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/submit",
      "Your solve has been successfully added.",
    );
  }
};