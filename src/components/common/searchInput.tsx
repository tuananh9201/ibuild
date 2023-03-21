import { searchIcon } from "@/constants/images";
import Image from "next/image";
type Props = {};

export default function SearchInput(props: Props) {
  return (
    <div className="border border-solid border-[#dddddd] lg:border-none rounded-[8px] lg:rounded-[4px flex flex-row items-center p-0 gap-4 isolate w-full h-[56px] bg-white py-4 pl-4 pr-10">
      <div className="flex gap-[10px] min-w-full">
        <Image className="w-5 h-5" src={searchIcon} alt="" />
        <input
          placeholder="Tìm kiếm văn bản pháp lý...."
          type="text"
          className="w-full border-none placeholder:not-italic placeholder:font-normal placeholder:text-base placeholder:leading-[150%]"
        />
      </div>
    </div>
  );
}
