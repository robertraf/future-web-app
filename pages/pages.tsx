import { useState } from "react";

import Head from "next/head";
import { GetServerSideProps } from "next";

import { slugify } from "@/utils/slugify";

import UserPageCard from "@/components/UserPageCard";

import { supabase } from "@/lib/initSupabase";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    // If no user, redirect to index.
    return {
      props: {},
      redirect: { destination: "/account", permanent: false },
    };
  }

  const { data: pages, error } = await supabase
    .from("pages")
    .select("id,title,slug")
    .eq("user_id", user.id);

  if (error) console.log("error", error);

  return {
    props: {
      initialPages: pages,
      user,
    },
  };
};

const Pages = ({ initialPages, user }) => {
  const [pages, setPages] = useState(initialPages);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [errorText, setErrorText] = useState("");

  const addPage = async (pageTitle) => {
    let title = pageTitle.trim();
    let slug = slugify(pageTitle.trim());

    if (title.length) {
      let { data: page, error } = await supabase
        .from("pages")
        .insert({
          title,
          slug,
          user_id: user.id,
        })
        .single();
      if (error) setErrorText(error.message);
      else setPages([page, ...pages]);

      setNewPageTitle("");
    }
  };

  return (
    <>
      <Head>
        <title>My Pages</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Pages
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Edit your pages easily and quickly.
            </p>
            <div>
              <input
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type="text"
                placeholder="My awesome page"
                value={newPageTitle}
                onChange={(e) => {
                  setErrorText("");
                  setNewPageTitle(e.target.value);
                }}
              />
              <button
                className="btn-black mt-5"
                onClick={() => addPage(newPageTitle)}
              >
                ➕ Add Page
              </button>
              {!!errorText && <div>{errorText}</div>}
            </div>
          </div>
          <div className="flex flex-wrap -m-2">
            {pages?.map((page) => (
              <UserPageCard key={page.id} page={page} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Pages;
