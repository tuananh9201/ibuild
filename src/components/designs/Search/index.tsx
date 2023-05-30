import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";

import {
  SearchIcon,
  DeleteIcon,
} from "@/images/icons/product_types/icon_wrapper";
import { historyIcon } from "@/constants/images";
import { SearchResultModel } from "@/lib/models";
import { getSearchHistories } from "@/lib/api/user";

const Search = () => {
  // state
  const [isActivateSearch, setIsActivateSearch] = useState(false);
  const [histories, setHistories] = useState<SearchResultModel[]>([]);
  const [inputValue, setInputValue] = useState("");

  // ref
  const inputRef = useRef<HTMLInputElement>(null);

  // function
  const onFocusInput = useCallback(() => {
    setIsActivateSearch(true);
  }, []);

  const getSearchHistory = async () => {
    const data = await getSearchHistories();
    setHistories(data);
  };

  // effect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsActivateSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (inputValue?.length > 0) {
      setHistories([]);
      return;
    }
    getSearchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);
  return (
    <div
      className={`max-w-[700px] w-full bg-white border ${
        isActivateSearch
          ? "border-transparent rounded-t-lg"
          : "border-[#dddddd] rounded-lg"
      } border-solid px-4 mx-auto absolute shadow-[0_0.5px_15px_1px_rgba(0,0,0,0.1)] left-1/4`}
      ref={inputRef}
    >
      <div
        className={`flex flex-row items-center justify-between h-16 border-b border-solid ${
          isActivateSearch ? "border-[#dddddd]" : "border-transparent"
        }`}
      >
        <div className="absolute left-4">
          <SearchIcon />
        </div>
        <input
          placeholder="Bạn đang muốn tìm thiết kế nào?"
          className="pl-9 border-none outline-none placeholder:text-text-color placeholder:font-normal placeholder:text-base flex-base"
          onFocus={onFocusInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="text-white bg-primary-color rounded-md px-10 py-4">
          Tìm kiếm
        </button>
      </div>
      {isActivateSearch && (
        <ul className="mt-2">
          {histories &&
            histories?.length > 0 &&
            histories.map((history) => (
              <li key={history.id}>
                <div className="flex justify-between items-center last:mb-4">
                  <div
                    className={`flex flex-row items-center gap-4 w-full p-4 hover:bg-zinc-100 hover:rounded-lg hover:cursor-pointer `}
                    onClick={() => {}}
                  >
                    <div className="icon w-5 h-5">
                      <Image src={historyIcon} alt="" />
                    </div>
                    <div className="font-normal text-base text-black-900 line-clamp-1">
                      {history.keyword}
                    </div>
                  </div>
                  <div
                    onClick={() => {}}
                    className="h-8 w-[10%] flex justify-center items-center cursor-pointer transition hover:rounded-lg hover:scale-125 hover:bg-zinc-100"
                  >
                    <DeleteIcon className="fill-[#666666]" />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
