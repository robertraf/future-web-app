import { useState, useEffect } from "react";
import Link from "next/link";
import { slugify } from "@/utils/slugify";

import { supabase } from "@/lib/initSupabase";

const PageList = ({ user }) => {
  const [pages, setPages] = useState([]);
  const [pageFilter, setPageFilter] = useState("1");
  const [newPageTitle, setNewPageTitle] = useState("");
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (pageFilter === "1") {
      fetchPages();
    } else if (pageFilter === "2") {
      fetchUserPages();
    }
  }, [pageFilter]);

  const fetchUserPages = async () => {
    let { data: pages, error } = await supabase
      .from("pages")
      .select("id,title,slug,author_name")
      .eq("user_id", user.id)
      .order("id", { ascending: false });

    if (error) console.log("error", error);
    else setPages(pages);
  };

  const fetchPages = async () => {
    let { data: pages, error } = await supabase
      .from("pages")
      .select("id,title,slug,author_name")
      .order("id", { ascending: false });

    if (error) console.log("error", error);
    else setPages(pages);
  };

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
          author_name: user.user_metadata.full_name,
        })
        .single();
      if (error) setErrorText(error.message);
      else setPages([page, ...pages]);

      setNewPageTitle("");
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
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
          <div className="mt-5">
            <label htmlFor="page-filter">Filter:</label>
            <select
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              name="page-filter"
              value={pageFilter}
              onChange={(e) => setPageFilter(e.target.value)}
            >
              <option value="1">All Pages</option>
              <option value="2">My Pages</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap -m-2">
          {pages.map((page) => (
            <div key={page.id} className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <Link href={`/page/${page.slug}`}>
                <a>
                  <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img
                      alt="team"
                      className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                      src="https://dummyimage.com/80x80"
                    />
                    <div className="flex-grow">
                      <h2 className="text-gray-900 title-font font-medium">
                        {page.title}
                      </h2>
                      <p className="text-gray-500">{`by ${page.author_name}`}</p>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PageList;
