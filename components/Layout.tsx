import { useRouter } from "next/router";

import Header from "@/components/Header";
import BottonNavbar from "@/components/BottonNavbar";

import { routeNameParser } from "@/utils/route";
import { headerNamesExceptions } from "@/constants/header";

const Layout = ({ children }) => {
  const { route } = useRouter();
  return (
    <>
      {!headerNamesExceptions.includes(route) ? (
        <>
          <Header>{routeNameParser({ route })}</Header>
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg min-h-screen">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        children
      )}

      {route !== "/page/[slug]" ? <BottonNavbar /> : null}
    </>
  );
};

export default Layout;
