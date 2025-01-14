import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import UserSolvesTable from "@/components/user-solves-table";
import UserStats from "@/components/user-stats";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Pencil} from "lucide-react"

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const {
    data: profile,
    error: profile_error
  } = await supabase
      .schema("daily_scramble")
      .from("profiles")
      .select("*")
      .eq("user", user.id)
      .single();

  if (profile_error) {
    console.error(profile_error);
  }
  const {
    data: solves,
    error: select_error
  } = await supabase
      .schema("daily_scramble")
      .from("solves")
      .select("*")
      .eq("user", user.id)
      .order("created_at", {ascending: false});

  if (select_error) {
    console.error(select_error);
  }

  return (
      <div className="flex-1 w-full flex flex-col gap-12">

        <div className="flex flex-col gap-2 items-start">
          <div className="w-full flex gap-2 items-center justify-between">
            <h1 className="font-bold text-3xl mb-4">Hello {profile?.display_name}</h1>
            <Link href="/profile/edit">
              <Button variant={"outline"}>
                <Pencil size={12}/> <span className={"ml-2"}> Edit profile</span>
              </Button>
            </Link>
          </div>
          <UserStats user_id={user.id}/>
        </div>
        <div className="min-w-full flex flex-col gap-4">
          <h2 className="font-bold text-2xl mb-4">Past solves</h2>
          <UserSolvesTable solves={solves}/>

        </div>
      </div>
  );
}
