import Image from "next/image";

import noSearchResult from "@/images/no_search_result.png";

interface NoFoundProductProps {
  title: string;
  content: string;
  category: string;
}

const NoFoundProduct = (props: NoFoundProductProps) => {
  return (
    <div className="w-full text-center">
      <Image
        src={noSearchResult}
        alt="no find search result"
        className="mx-auto mb-4"
      />
      <h2 className="font-roboto not-italic font-medium text-xl leading-[150%] text-[rgba(0, 0, 0, 0.9)] mb-2">
        {props.content}
      </h2>
      <p className="font-roboto not-italic font-normal text-base leading-[150%] text-[f7f7f7]">
        “{props.title}” không trùng khớp với bất kì {props.category} hiện có,
        xin vui lòng kiểm tra lại.
      </p>
    </div>
  );
};

export default NoFoundProduct;
