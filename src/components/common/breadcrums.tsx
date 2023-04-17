import { breadcrumIcon } from "@/constants/images";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IBreadcrums } from "src/lib/types";
interface Props {
  breadcrumbs: IBreadcrums[];
}

const Breadcrums = ({ breadcrumbs }: Props) => {
  const router = useRouter();
  function generateBreadcrumbs() {
    // Remove any query parameters, as those aren't included in breadcrumbs
    const asPathWithoutQuery = router.asPath.split("?")[0];

    // Break down the path between "/"s, removing empty entities
    // Ex:"/my/nested/path" --> ["my", "nested", "path"]
    const asPathNestedRoutes = asPathWithoutQuery
      .split("/")
      .filter((v) => v.length > 0);

    // Iterate over the list of nested route parts and build
    // a "crumb" object for each one.
    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      // We can get the partial nested route for the crumb
      // by joining together the path parts up to this point.
      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
      // The title will just be the route string for now
      const title = subpath;
      return { href, title };
    });
    return crumblist;
  }
  const crumsHref = generateBreadcrumbs();
  console.log(crumsHref);

  return (
    <div className="flex flex-row items-center lg:p-0 w-full lg:mt-10">
      {breadcrumbs.map((breadcrumb, idx) => {
        return (
          <div
            key={idx}
            className={`flex items-center lg:first:flex lg:first:items-center not-italic font-normal text-base leading-[150%] gap-4 text-primary-color hover:cursor-pointer hover:last:cursor-default peer last:w-[calc(100% - 158px)] last:overflow-hidden last:text-ellipsis last:ml-3`}
          >
            <span className="whitespace-nowrap inline-block">
              <Link
                href={`${crumsHref[idx].href}`}
                className="peer-hover:text-primary-color peer-hover:peer-last:text-black visited:text-[#343434]"
              >
                {breadcrumb.title}
              </Link>
            </span>
            {idx === breadcrumbs.length - 1 ? null : (
              <div className="w-4 h-4 lg:w-6 lg:h-6 inline-block">
                <Image src={breadcrumIcon} alt="" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrums;
