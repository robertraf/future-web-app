import { supabase } from "@/lib/initSupabase";
import { Auth } from "@supabase/ui";

const LoginForm = () => {
  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      <Auth
        supabaseClient={supabase}
        providers={["github", "google"]}
        socialLayout="horizontal"
        socialButtonSize="xlarge"
      />
    </div>
  );
};

export default LoginForm;
