import { ModalProvider, useCMS, useForm, usePlugin } from "tinacms";
import { InlineForm, InlineBlocks } from "react-tinacms-inline";
import { Hero, HeroBlock } from "@/components/blocks/Hero";

import { supabase } from "@/lib/initSupabase";

const blocks = {
  HeroBlock: {
    Component: Hero,
    template: HeroBlock,
  },
};

const TinaForm = ({ page }) => {
  const cms = useCMS();

  const initialValues = page.data ?? {};

  const [, form] = useForm({
    id: page.id,
    label: page.title,
    initialValues,
    onSubmit: async (formData) => {
      try {
        await supabase
          .from("pages")
          .update({ data: formData })
          .eq("id", page.id)
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
