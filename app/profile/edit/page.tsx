import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {updateProfile} from "@/app/profile/edit/actions";
import {createClient} from "@/utils/supabase/server";

export default async function EditProfile(props: {
  searchParams: Promise<Message>;
}) {
  const supabase = await createClient();
  const searchParams = await props.searchParams;

  const {data: {user}} = await supabase.auth.getUser();

  const {
    data: profile,
    error: noProfileFoundError,
  } = await supabase
    .schema("daily_scramble")
    .from("profiles")
    .select("*")
    .eq("user", user?.id)
    .single();


  return (
    <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">Edit profile</h1>
      <Label htmlFor="name" className="mt-12">Name</Label>
      <Input
        name="name"
        required
        defaultValue={profile?.name ?? ""}
      />

      <Label htmlFor="display-name" className="mt-12">Display name</Label>
      <Input
        name="display-name"
        pattern="[A-Za-z0-9{3,}]"
        required
        defaultValue={profile?.display_name ?? ""}
      />
      <SubmitButton formAction={updateProfile}>
        Update profile
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
