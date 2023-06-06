import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import {
  SearchIcon,
  DeleteIcon,
} from "@/images/icons/product_types/icon_wrapper";
import { historyIcon } from "@/constants/images";
import { SearchResultModel } from "@/lib/models";
import {
  deleteSearchHistory,
  getSearchHistories,
  createSearchHistory,
} from "@/lib/api/user";

interface SearchProps {
  onChangeInput: (search: string) => void;
}

const Search = ({ onChangeInput }: SearchProps) => {
  const router = useRouter();
  const { query } = router;
  const { search } = query;

  // state
  const [isActivateSearch, setIsActivateSearch] = useState(false);
  const [histories, setHistories] = useState<SearchResultModel[]>([]);
  const [inputValue, setInputValue] = useState("");

  // ref
  const inputRef = useRef<HTMLInputElement>(null);

  // function
  const onFocusInput = useCallback(() => {
    setIsActivateSearch(true);

    if (inputValue?.length === 0) {
      getSearchHistory();
    }
  }, [inputValue]);

  const getSearchHistory = async () => {
    const data = await getSearchHistories();
    setHistories(data);
  };

  const postSearchHistory = async (keyword: string) => {
    await createSearchHistory(keyword);
  };

  const searchDesign = () => {
    if (inputValue?.length < 2) return;
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        search: inputValue,
      },
    });
    // onChangeInput(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      postSearchHistory(inputValue);
      searchDesign();
      return;
    }
    if (e.keyCode === 231) return;
    const pattern = /^[a-zA-Z0-9 ]+$/;
    const isValid = pattern.test(e.key);
    if (!isValid) {
      e.preventDefault();
      return;
    }
  };

  const handlePasteName = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteValue = e?.clipboardData?.getData("text") || "";

    const removeSpecialCharacter = pasteValue.replace(/[^a-zA-Z0-9À-ỹ\s]/g, "");
    console.log(removeSpecialCharacter);
    setInputValue(removeSpecialCharacter);
    e.preventDefault();
  };

  const handleDeleteHistory = async (id: string) => {
    const option = histories.find((history) => history.id === id);
    if (option) {
      const newHistory = histories.filter(
        (history) => history.id !== option.id
      );
      setHistories(newHistory);
    }
    await deleteSearchHistory(id);
  };

  const handleClickSearch = () => {
    postSearchHistory(inputValue);
    searchDesign();
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

  useEffect(() => {
    if (search) {
      setInputValue(search as string);
      onChangeInput(search as string);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  return (
    <div
      className={`max-w-[700px] w-full bg-white border ${
        isActivateSearch
          ? "border-transparent rounded-t-lg"
          : "border-[#dddddd] rounded-lg"
      } border-solid px-4 mx-auto absolute shadow-[0_0.5px_15px_1px_rgba(0,0,0,0.1)] left-1/2 -translate-x-1/2`}
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
          onKeyDown={handleKeyDown}
          onPaste={handlePasteName}
        />
        <button
          className="text-white bg-primary-color rounded-md px-2 sm:px-10 py-4"
          onClick={handleClickSearch}
        >
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
                    className={`flex flex-row items-center gap-4 w-full p-4 hover:bg-zinc-100 hover:rounded-lg hover:cursor-pointer`}
                    onClick={() => setInputValue(history.keyword)}
                  >
                    <div className="icon w-5 h-5">
                      <Image src={historyIcon} alt="" />
                    </div>
                    <div className="font-normal text-base text-black-900 line-clamp-1">
                      {history.keyword}
                    </div>
                  </div>
                  <div
                    onClick={() => handleDeleteHistory(history.id)}
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
