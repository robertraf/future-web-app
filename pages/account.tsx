import Head from "next/head";

import LogginForm from "@/components/LoginForm";

import { Auth } from "@supabase/ui";
import { supabase } from "@/lib/initSupabase";

const Account = () => {
  const { user } = Auth.useUser();

  return (
    <>
      <Head>
        <title>Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!user ? (
        <LogginForm />
      ) : (
        <>
          <div className="bg-white pb-6 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-sm mx-auto">
            <div className="relative h-40">
              <img
                className="absolute h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1448932133140-b4045783ed9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              />
            </div>
            <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
              <img
                className="object-cover w-full h-full"
                src={
                  user
                    ? user?.user_metadata?.avatar_url
                    : "https://dummyimage.com/80x80"
                }
              />
            </div>
            <div className="mt-16">
              <h1 className="text-lg text-center font-semibold">
                {user?.user_metadata?.full_name}
              </h1>
              {/* <p className="text-sm text-gray-600 text-center">13 pages</p> */}
            </div>
            <div className="mt-6 pt-3 flex flex-wrap content-center justify-center mx-6 border-t">
              <button
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={async () => {
                  const { error } = await supabase.auth.signOut();
                  if (error) console.log("Error logging out:", error.message);
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Account;
