import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {SubmitButton} from "@/components/submit-button";
import Cube from "@/utils/cube";
import {submitSolve} from "@/app/submit/actions";
import {FormMessage, Message} from "@/components/form-message";

export default async function Submit(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const todayScramble = Cube.generateScramble().join("");

  return (
      <form className="flex-1 flex flex-col min-w-64">
        <h1 className="text-2xl font-medium">Solve submission</h1>

        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="date">Scramble</Label>
          <Input name="scramble" required readOnly={true} value={todayScramble}/>
          <Label htmlFor="solve-time">Solve time (seconds)</Label>
          <Input name="solve-time" type="number" step={0.01} min="0" required/>


          <div className="flex gap-16 justify-between">

            <Label htmlFor="video-url">Video</Label>
            <span className="text-sm text-gray-500">Optional, required for verification.</span>
          </div>
          <Input name="video-url" placeholder="https://youtu.be/7Ron6MN45LY?si=2R8Y6BGI32UpjTIH"/>


          <SubmitButton pendingText="Submitting..." formAction={submitSolve}>
            Submit
          </SubmitButton>
          <FormMessage message={searchParams}/>
        </div>
      </form>
  )
}