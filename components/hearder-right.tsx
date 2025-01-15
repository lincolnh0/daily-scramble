import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import {Box, Cctv, Trophy, House, User} from "lucide-react";

const menuItems = [
  {name: "Profile", href: "/profile", icon: User},
  {name: "Interactive cube", href: "/interactive", icon: Box},
  {name: "Leaderboard", href: "/leaderboard", icon: Trophy},
  {name: "Verify", href: "/verify", icon: Cctv},
];
export default async function HeaderRight() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-6">
      <div className="lg:flex hidden gap-8 items-center ">
      {menuItems.map((item, index) => (
        <Link key={index} href={item.href} title={item.name}>
            <item.icon/>
        </Link>
      ))}
        </div>
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
