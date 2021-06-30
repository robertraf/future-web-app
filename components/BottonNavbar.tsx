import Link from "next/link";

import { Auth } from "@supabase/ui";

const BottonNavbar = () => {
  const { user } = Auth.useUser();

  return (
    <div className="w-full h-screen">
      <section
        id="bottom-navigation"
        className="block pt-3 pb-3 fixed inset-x-0 bottom-0 z-10 bg-white shadow"
      >
        <div id="tabs" className="flex justify-between">
          <Link href="/">
            <a className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="inline-block mb-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="tab tab-home block text-xs">Home</span>
            </a>
          </Link>
          <Link href="/explore">
            <a className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block mb-1"
                width="25"
                height="25"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                />
              </svg>
              <span className="tab tab-explore block text-xs">Explore</span>
            </a>
          </Link>

          {/* <a className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="inline-block mb-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="tab tab-kategori block text-xs">Add Page</span>
          </a> */}
          <Link href="/pages">
            <a className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                className="inline-block mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="tab tab-whishlist block text-xs">My Pages</span>
            </a>
          </Link>
          <Link href="/account">
            <a className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
              {user ? (
                <img
                  className="inline-block mb-1 rounded-full"
                  width="25"
                  height="25"
                  src={user?.user_metadata?.avatar_url}
                  alt="avatar"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block mb-1"
                  width="25"
                  height="25"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <span className="tab tab-account block text-xs">Account</span>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BottonNavbar;
