import { news2 } from "@/constants/images";

import Image from "next/image";

const NewCardFeature = () => {
  return (
    <div className="flex flex-row items-center p-0 gap-6">
      <div className="flex-1 rounded-[4px] hover:cursor-pointer">
        <Image src={news2} alt="" />
      </div>
      <div className="flex-1 lg:flex-2 flex flex-col items-start p-0">
        <div className="font-normal text-sm leading-[150%] text-[#717171]">
          25/07/2022
        </div>
        <div className="font-medium text-xl leading-[150%] hover:cursor-pointer">
          Tăng cường bảo vệ nguồn nước dưới đất trong hoạt động khảo sát địa
          chất công trình, xử lý nền móng công trình xây dựng
        </div>
      </div>
    </div>
  );
};

export default NewCardFeature;
