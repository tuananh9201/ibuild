import { breadcrumIcon } from "@/constants/images";
import style from "@/styles/modules/build-info.module.scss";
import { IBreadcrums } from "lib/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
interface Props {
  breadcrumbs: IBreadcrums[];
}

const Breadcrums = ({ breadcrumbs }: Props) => {
  const router = useRouter();
  console.log("router : ", router);
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
  console.log("crumsHref : ", crumsHref);

  return (
    <div className={style.Breadcrums}>
      {breadcrumbs.map((breadcrumb, idx) => {
        return (
          <div key={idx} className={style.Breadcrums_Text}>
            <span>
              <Link href={`${crumsHref[idx].href}`}>{breadcrumb.title}</Link>
            </span>
            {idx === breadcrumbs.length - 1 ? null : (
              <div className={style.Breadcrums_Text_Icon}>
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
