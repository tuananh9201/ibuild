import Image from "next/image";

import noSearchResult from "@/images/no_search_result.png";

interface NoFoundResultProps {
  content: string;
}

const NoFoundResult = ({ content }: NoFoundResultProps) => {
  return (
    <div className="w-full text-center">
      <Image
        src={noSearchResult}
        alt="no find search result"
        className="mx-auto mb-4"
      />
      <p className="font-roboto not-italic font-medium text-xl leading-[150%]">
        {content}
      </p>
    </div>
  );
};

export default NoFoundResult;
