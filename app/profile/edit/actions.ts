"use server";
import {createClient} from "@/utils/supabase/server";
import {encodedRedirect} from "@/utils/utils";
import {redirect} from "next/navigation";

export const updateProfile = async (formData: FormData) => {
  const displayName = formData.get("display-name") as string;
  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser();

  const {data:profile, error: noProfileFoundError} = await supabase.schema("daily_scramble").from("profiles").select("*").eq("user", user?.id).single();

  if (noProfileFoundError) {
    const {error} = await supabase.schema("daily_scramble").from("profiles").insert({
      display_name: displayName,
      user: user?.id,
    });
    return redirect("/profile");

  }

  const {error} = await supabase.schema("daily_scramble").from("profiles").upsert({
    display_name: displayName,
    user: user?.id,
    id: profile.id,
  });

  if (error) {
    return encodedRedirect("error", "/profile/edit", error.message);
  }

  return redirect("/profile");
};
