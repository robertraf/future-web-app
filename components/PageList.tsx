import { useState, useEffect } from "react";
import { slugify } from "@/utils/slugify";

import { supabase } from "@/lib/initSupabase";

const PageList = ({ user }) => {
  const [pages, setPages] = useState([]);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    let { data: pages, error } = await supabase.from("pages").select("*");

    if (error) console.log("error", error);
    else setPages(pages);
  };

  const addPage = async (pageTitle) => {
    let title = pageTitle.trim();
    let slug = slugify(pageTitle.trim());

    if (title.length) {
      let { data: page, error } = await supabase
        .from("pages")
        .insert({ title, slug, userid: user.id })
        .single();
      if (error) setErrorText(error.message);
      else setPages([...pages, page]);
    }
  };

  return (
    <div>
      <div>Hi {user?.user_metadata?.full_name}</div>
      <div>Page List</div>
      <div>
        <input
          className="rounded w-full p-2"
          type="text"
          placeholder="My Awesome page"
          value={newPageTitle}
          onChange={(e) => {
            setErrorText("");
            setNewPageTitle(e.target.value);
          }}
        />
        <button className="btn-black" onClick={() => addPage(newPageTitle)}>
          Add
        </button>
      </div>
      {!!errorText && <div>{errorText}</div>}
      <pre>{JSON.stringify(pages, null, 2)}</pre>
    </div>
  );
};

export default PageList;
