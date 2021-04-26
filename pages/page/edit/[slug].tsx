import { GetServerSideProps } from "next";
import { withTina } from "tinacms";
import TinaForm from "@/components/TinaForm";

import { supabase } from "@/lib/initSupabase";

export const getServerSideProps: GetServerSideProps = async ({
  params: { slug },
  req,
}) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    // If user doesn't exist, redirect to home page.
    return { props: {}, redirect: { destination: "/", permanent: false } };
  }

  const { data: page, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .eq("user_id", user.id);

  if (error) console.log("error", error);

  if (!page?.length) {
    // If user but not the owner, redirect to index.
    return { props: {}, redirect: { destination: "/", permanent: false } };
  }

  return {
    props: {
      page: page[0],
    },
  };
};

const EditPage = ({ page }) => {
  return (
    <div className="mt-20 mx-5">
      <TinaForm page={page} />
    </div>
  );
};

export default withTina(EditPage, {
  enabled: true,
  sidebar: false,
  toolbar: true,
});
