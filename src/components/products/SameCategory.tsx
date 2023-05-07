import useSWR from "swr";
import Link from "next/link";
import { useEffect, useState } from "react";

import ListProductLoading from "../common/ListProductLoading";
import ListProduct from "./ListProduct";
import { searchProduct } from "@/lib/api/product";
import { fetchRootProductCategoryById } from "@/lib/api/category";
import { CategoryInfo } from "@/lib/types";

interface SameCategoryProps {
  title: string;
  categoryId: string;
  slug?: string;
}

const SameCategory = ({ title, categoryId, slug }: SameCategoryProps) => {
  const [categorySlug, setCategorySlug] = useState("");

  const payload = {
    category_id: [categoryId],
    cities: [],
    max_quantity: 99999,
    min_quantity: 0,
    max_price: 999999999,
    min_price: 0,
    sort_by: "LIEN_QUAN_NHAT",
    limit: 4,
    skip: 0,
  };

  const { data, isLoading } = useSWR(payload, searchProduct);

  useEffect(() => {
    const getCategorySlug = async () => {
      const categoryInfo: CategoryInfo[] = await fetchRootProductCategoryById(
        categoryId
      );
      if (categoryInfo?.length) {
        const category = categoryInfo.find((item) => item.parent_id === "0");
        const slug = category ? category.slug : categoryInfo[0].slug;
        setCategorySlug(slug || "");
      }
    };

    getCategorySlug();
  }, [categoryId]);

  return (
    <div className="max-w-[1280px] mx-auto my-0 mt-10">
      {data && (
        <div className="flex flex-row justify-between items-center mb-6">
          <h3 className="font-roboto not-italic font-medium text-xl leading-[150%] text-text-color">
            {title}
          </h3>
          <Link href={`/san-pham/${categorySlug}`}>
            <button className="text-primary-color font-roboto not-italic font-medium text-base leading-[150%]">
              Xem thêm
            </button>
          </Link>
        </div>
      )}
      {isLoading ? (
        <ListProductLoading items={4} />
      ) : (
        <ListProduct products={data?.data || []} />
      )}
    </div>
  );
};

export default SameCategory;
