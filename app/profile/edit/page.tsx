import {FormMessage, Message} from "@/components/form-message";
import {SubmitButton} from "@/components/submit-button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
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
      <form className="flex flex-col w-full max-w-2xl p-4 gap-2 [&>input]:mb-4">
        <h1 className="text-2xl font-medium">Edit profile</h1>
        <div className={"my-6 flex flex-col w-full max-w-2xl gap-8"}>

          <div className={"flex flex-col gap-4"}>
            <Label htmlFor="name">Name</Label>
            <Input
                name="name"
                required
                defaultValue={profile?.name ?? ""}
            />
          </div>
          <div className={"flex flex-col gap-4"}>
            <Label htmlFor="display-name" className="">Display name</Label>
            <div>
              <Input
                  name="display-name"
                  pattern="[A-Za-z0-9_]{1,15}"
                  required
                  defaultValue={profile?.display_name ?? ""}
              />
            </div>
          </div>
        </div>
        <SubmitButton formAction={updateProfile}>
          Update profile
        </SubmitButton>
        <FormMessage message={searchParams}/>
      </form>
  );
}
