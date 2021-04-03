import Head from "next/head";

import PageList from "@/components/PageList";

import { supabase } from "@/lib/initSupabase";
import { Auth } from "@supabase/ui";

const Home = () => {
  const { user } = Auth.useUser();

  return (
    <>
      <Head>
        <title>Future Web App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-full bg-gray-300">
        {!user ? (
          <div className="w-full h-full flex justify-center items-center p-4">
            <Auth
              supabaseClient={supabase}
              providers={["github"]}
              socialLayout="horizontal"
              socialButtonSize="xlarge"
            />
          </div>
        ) : (
          <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <PageList user={user} />
            <button
              className="btn-black w-full mt-12"
              onClick={async () => {
                const { error } = await supabase.auth.signOut();
                if (error) console.log("Error logging out:", error.message);
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
