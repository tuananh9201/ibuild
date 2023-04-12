import useSWR from "swr";

import ListProductLoading from "../common/ListProductLoading";
import ListProduct from "./ListProduct";
import { searchProduct } from "@/lib/api/product";

interface SameCategoryProps {
  title: string;
  categoryId: string;
}

const SameCategory = ({ title, categoryId }: SameCategoryProps) => {
  const payload = {
    category_id: [categoryId],
    cities: [categoryId],
    max_quantity: 0,
    min_quantity: 0,
    max_price: 0,
    min_price: 0,
    sort_by: "LIEN_QUAN_NHAT",
    limit: 4,
    skip: 0,
  };

  const { data, isLoading } = useSWR(payload, searchProduct);

  console.log(data);

  return (
    <div className="max-w-[1280px] mx-auto my-0 mt-10">
      {data && (
        <div className="flex flex-row justify-between items-center mb-6">
          <h3 className="font-roboto not-italic font-medium text-xl leading-[150%] text-text-color">
            {title}
          </h3>
          <button className="text-primary-color font-roboto not-italic font-medium text-base leading-[150%]">
            Xem thêm
          </button>
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
