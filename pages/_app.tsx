import "tailwindcss/tailwind.css";
import type { AppProps /*, AppContext */ } from "next/app";
import { Auth } from "@supabase/ui";
import { supabase } from "@/lib/initSupabase";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </Auth.UserContextProvider>
  );
}

export default MyApp;
