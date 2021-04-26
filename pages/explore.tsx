import Head from "next/head";
import { GetServerSideProps } from "next";

import PageCard from "@/components/PageCard";

import { supabase } from "@/lib/initSupabase";

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: pages, error } = await supabase
    .from("pages")
    .select("id,title,slug,users(full_name, avatar_url)")
    .order("id", { ascending: false });

  if (error) console.log("error", error);

  return {
    props: {
      pages,
    },
  };
};

const Explore = ({ pages }) => {
  return (
    <>
      <Head>
        <title>Explore</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-wrap -m-2">
        {pages.map((page) => (
          <PageCard key={page.id} page={page} />
        ))}
      </div>
    </>
  );
};

export default Explore;
