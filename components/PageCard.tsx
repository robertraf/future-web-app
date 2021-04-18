import Link from "next/link";

const PageCard = ({ page }) => {
  return (
    <div key={page.id} className="p-2 lg:w-1/3 md:w-1/2 w-full">
      <Link href={`/page/${page.slug}`}>
        <a>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="avatar"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={
                page?.users?.avatar_url
                  ? page.users.avatar_url
                  : "https://dummyimage.com/80x80"
              }
              loading="lazy"
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">
                {page.title}
              </h2>
              <p className="text-gray-500">{`by ${
                page?.users?.full_name ? page.users.full_name : "Secret User"
              }`}</p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default PageCard;
