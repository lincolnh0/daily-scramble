import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {updateProfile} from "@/app/profile/edit/actions";

export default async function EditProfile(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">Edit profile</h1>
      <Label htmlFor="display-name" className="mt-12">Display name</Label>
      <Input
        name="display-name"
        required
      />
      <SubmitButton formAction={updateProfile}>
        Update profile
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
