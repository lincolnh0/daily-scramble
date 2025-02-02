"use server";

import {encodedRedirect} from "@/utils/utils";
import {createClient} from "@/utils/supabase/server";
import Cube from "@/utils/cube";

export const submitSolve = async (formData: FormData) => {
  const supabase = await createClient();

  const solveTime = formData.get("solve-time");
  const scramble = Cube.generateScramble().join(" ");
  const videoUrl = formData.get("video-url")?.toString();
  const submitToLeaderboard = formData.get("public") === "on";

  if (videoUrl && !videoUrl?.includes("youtube.com") && !videoUrl?.includes("youtu.be")) {
    return encodedRedirect("error", "/submit", "Please provide a valid YouTube video URL.");
  }
  let videoId = "";
  if (videoUrl?.includes("youtu.be")) {
    videoId = videoUrl.split("?")[0].split("/").reverse()[0];
  } else if (videoUrl?.includes("youtube.com")) {
    const queryParams = new URLSearchParams(videoUrl.split("?")[1]);
    videoId = queryParams.get("v") ?? "";
  }


  if (submitToLeaderboard && !videoUrl) {
    return encodedRedirect("error", "/submit", "Please provide a video URL to submit to the leaderboard.");
  }

  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase.schema("daily_scramble").from("solves").insert([{
    solve_time: solveTime,
    scramble: scramble,
    video_id: videoId,
    user: user?.id,
    public: submitToLeaderboard,
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