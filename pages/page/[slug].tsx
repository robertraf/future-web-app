import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { withTina } from "tinacms";
import TinaForm from "@/components/TinaForm";

import { supabase } from "@/lib/initSupabase";

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get pages
  const { data: pages } = await supabase.from("pages").select("slug");

  // Get the paths we want to pre-render based on pages
  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const { data: page, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug);

  if (error) console.log("error", error);

  if (!page?.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page: page[0],
    },
    // Re-generate the page at most once per second
    // if a request comes in
    revalidate: 1,
  };
};

const Page = ({ page }) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <TinaForm page={page} />;
};

export default withTina(Page, {
  enabled: false,
  sidebar: false,
  toolbar: false,
});
