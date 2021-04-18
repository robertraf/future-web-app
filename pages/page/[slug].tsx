import { GetServerSideProps } from "next";
import { useCMS, withTina } from "tinacms";
import TinaForm from "@/components/TinaForm";

import { supabase } from "@/lib/initSupabase";
import { Auth } from "@supabase/ui";

export const getServerSideProps: GetServerSideProps = async ({
  params: { slug },
}) => {
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
      page,
    },
  };
};

const Page = ({ page }) => {
  const cms = useCMS();

  const { user } = Auth.useUser();

  const currentPage = page[0];

  return (
    <>
      <div className={cms.enabled ? "mt-20 mx-5" : ""}>
        <TinaForm cms={cms} currentPage={currentPage} />
      </div>
      {currentPage?.user_id === user?.id && (
        <button onClick={() => cms.toggle()}>
          {cms.enabled ? "Exit Edit Mode 🚪" : "Edit This Site ✏️"}
        </button>
      )}
    </>
  );
};

export default withTina(Page, {
  enabled: false,
  sidebar: false,
  toolbar: true,
});
