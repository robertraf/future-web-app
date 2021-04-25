import { useEffect } from "react";
import "tailwindcss/tailwind.css";
import type { AppProps /*, AppContext */ } from "next/app";

import Layout from "@/components/Layout";

/**
 * Supabase
 */
import { Auth } from "@supabase/ui";
import { supabase } from "@/lib/initSupabase";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        fetch("/api/auth", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json());
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Auth.UserContextProvider>
  );
}

export default MyApp;
