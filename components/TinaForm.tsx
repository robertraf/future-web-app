import { ModalProvider, useForm, usePlugin } from "tinacms";
import { InlineForm, InlineBlocks } from "react-tinacms-inline";
import { Hero, HeroBlock } from "@/components/blocks/Hero";

import { supabase } from "@/lib/initSupabase";

const blocks = {
  HeroBlock: {
    Component: Hero,
    template: HeroBlock,
  },
};

const TinaForm = ({ cms, currentPage }) => {
  const initialValues = currentPage.data ?? {};

  const [, form] = useForm({
    id: currentPage.id,
    label: currentPage.title,
    initialValues,
    onSubmit: async (formData) => {
      try {
        await supabase
          .from("pages")
          .update({ data: formData })
          .eq("id", currentPage.id)
          .single();
        cms.alerts.success("Page saved successfully.");
      } catch (error) {
        cms.alerts.error(`An error occurred while saving: ${error.message()}`);
      }
    },
  });

  usePlugin(form);

  return (
    <ModalProvider>
      <InlineForm form={form}>
        <InlineBlocks name="blocks" blocks={blocks} />
      </InlineForm>
    </ModalProvider>
  );
};

export default TinaForm;
