"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { Select } from "antd";
import { motion } from "framer-motion";
import Image from "next/image";

import { historyIcon } from "@/constants/images";
import {
  DeleteIcon,
  UpDownIcon,
  SearchIcon,
} from "@/images/icons/product_types/icon_wrapper";
import { ISuggestionKeyword, getSuggestionKeyword } from "@/lib/api/suggestion";
import {
  authWithAccessToken,
  createSearchHistory,
  deleteSearchHistory,
  getSearchHistories,
} from "@/lib/api/user";
import useDebounce from "@/lib/hooks/useDebounce";
import useUser from "@/lib/hooks/user";
import { SearchResultModel } from "@/lib/models";

type HistoryItem = {
  item: string;
  id: string;
  isHighLight: boolean;
  closeSearchModal: Function;
  setKeywordSearch?: Function;
  getSearchResultAgain?: Function;
};

interface ProductSearchProps {
  initialValue: string;
  selectValue?: string;
  searchDesign?: boolean;
  onClick?: () => void;
  setInputValueToParent?: Function;
  redirectToSearchPage?: Function;
  onSelectValue?: Function;
}

type SearchSuggestionProps = {
  item: string;
  isHighLight: boolean;
  onSelect: Function;
  setValue?: Function;
};

const SearchHistoryItem = (props: HistoryItem) => {
  const selectSelectedProduct = (item: string) => {
    props.closeSearchModal(false);
    if (props.setKeywordSearch) {
      props.setKeywordSearch(item);
    }
  };

  const handleDeleteItem = async (id: string) => {
    await deleteSearchHistory(id);
    if (props.getSearchResultAgain) {
      props.getSearchResultAgain();
    }
  };

  return (
    <div className="flex justify-between items-center last:mb-4">
      <div
        className={`flex flex-row items-center gap-4 w-full p-4 hover:bg-zinc-100 hover:rounded-lg hover:cursor-pointer ${
          props.isHighLight ? "bg-zinc-100 rounded-lg" : "bg-white"
        }`}
        onClick={() => selectSelectedProduct(props.item)}
      >
        <div className="icon w-5 h-5">
          <Image src={historyIcon} alt="" />
        </div>
        <div className="font-normal text-base text-black-900 line-clamp-1">
          {props.item}
        </div>
      </div>
      <div
        onClick={() => handleDeleteItem(props.id)}
        className="h-8 w-[10%] flex justify-center items-center cursor-pointer transition hover:rounded-lg hover:scale-125 hover:bg-zinc-100"
      >
        <DeleteIcon className="fill-[#666666]" />
      </div>
    </div>
  );
};

const SearchSuggestionItem = (props: SearchSuggestionProps) => {
  const handleSelectValue = () => {
    props.onSelect(false);
    if (props.setValue) {
      props.setValue(props.item);
    }
  };

  return (
    <div
      className="flex justify-between items-center last:mb-4"
      onClick={handleSelectValue}
    >
      <div
        className={`flex flex-row items-center gap-4 w-full p-4 hover:bg-zinc-100 hover:rounded-lg hover:cursor-pointer ${
          props.isHighLight ? "bg-zinc-100 rounded-lg" : "bg-white"
        }`}
      >
        <div className="icon w-5 h-5">
          <SearchIcon />
        </div>
        <div className="font-normal text-base text-black-900 line-clamp-1">
          {props.item}
        </div>
      </div>
    </div>
  );
};

const ProductSearch = ({
  initialValue,
  selectValue,
  searchDesign,
  setInputValueToParent,
  redirectToSearchPage,
  onSelectValue,
}: ProductSearchProps) => {
  const { user } = useUser();

  const [isActivateSearch, setIsActivateSearch] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [histories, setHistories] = useState<SearchResultModel[]>([]);
  const [suggestion, setSuggestion] = useState<ISuggestionKeyword[]>([]);
  const [userRole, setUserRole] = useState("");
  const [highLightOption, setHighLightOption] = useState(-1);
  const [inputValue, setInputValue] = useState("");
  const [suggestionSelected, setSuggestionSelected] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const getSearchHistory = async () => {
    const data = await getSearchHistories();
    setHistories(data);
  };

  const debounceValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (initialValue?.length > 0) {
      setHistories([]);
      return;
    }
    getSearchHistory();
  }, [initialValue]);

  useEffect(() => {
    if (!selectValue) return;
    setSuggestion([]);
    if (debounceValue && debounceValue?.length && debounceValue?.length > 1) {
      const getSuggestion = async () => {
        const res = await getSuggestionKeyword({
          search_type:
            selectValue === "0"
              ? "PRODUCT"
              : selectValue === "1"
              ? "CATEGORY"
              : selectValue === "2"
              ? "SUPPLIER"
              : "",
          limit: 10,
          keyword: debounceValue,
        });
        setSuggestion(res);
      };

      getSuggestion();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsActivateSearch(false);
      }
    };
    const getUser = async () => {
      const res = await authWithAccessToken();
      res && setUserRole(res?.user_type || "user");
    };

    document.addEventListener("mousedown", handleClickOutside);
    getUser();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const type = localStorage.getItem("search_type");
    !type && localStorage.setItem("search_type", "0");
    type && onSelectValue && onSelectValue(type);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onFocusInput = useMemo(() => {
    return (e: React.FocusEvent<HTMLInputElement, Element>) => {
      setIsActivateSearch(true);
    };
  }, []);
  const handler = () => {
    if (!initialValue || initialValue.trim().length < 2) return;
    createSearchHistory(initialValue);
    if (redirectToSearchPage) {
      redirectToSearchPage();
    }
  };
  const handleAddSearchResult = () => {
    handler();
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (setInputValueToParent) {
      setInputValueToParent(e.target.value);
      setHighLightOption(-1);
    }
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handler();
    }
    if (e.key === "ArrowDown") {
      if (!setInputValueToParent) return;
      const index = Math.min(highLightOption + 1, initialValue ? 9 : 4);
      setHighLightOption(index);
      if (!initialValue) {
        setInputValueToParent(histories[index]?.keyword || "");
      } else {
        setInputValueToParent(suggestion[index]?.name || "");
      }
    }
    if (e.key === "ArrowUp") {
      if (!setInputValueToParent) return;
      const index = Math.max(highLightOption - 1, 0);
      setHighLightOption(index);
      if (!initialValue) {
        setInputValueToParent(histories[index]?.keyword || "");
      } else {
        setInputValueToParent(suggestion[index]?.name || "");
      }
    }
  };
  const handleSelect = (value: string) => {
    localStorage.setItem("search_type", value);
    onSelectValue && onSelectValue(value);
  };
  const handleSelectItem = (item: string) => {
    setInputValueToParent && setInputValueToParent(item);
    setSuggestionSelected(item);
  };

  useEffect(() => {
    suggestionSelected && handler();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestionSelected]);

  const className =
    "flex flex-row justify-start items-center p-2 gap-2 lg:max-w-3/4 bg-white rounded-lg h-16 ";
  const classNameActivate = `${className} border-solid border border-[#dddddd]`;
  return (
    <motion.div
      animate={histories ? "active" : "deactive"}
      className={
        histories.length > 0
          ? "absolute z-20 mt-2 lg:mt-10 lg:max-w-3/4 flex flex-col bg-white items-start gap-2 shadow-[0_0.5px_15px_1px_rgba(0,0,0,0.1)] rounded-lg"
          : "absolute z-20 mt-2 lg:mt-10 lg:max-w-3/4 flex flex-col gap-2"
      }
      ref={inputRef}
    >
      <div className={isActivateSearch ? className : classNameActivate}>
        {userRole === "expert" && !searchDesign && (
          <>
            <Select
              defaultValue={selectValue}
              style={{ width: 170 }}
              bordered={false}
              options={[
                { value: "0", label: "Sản phẩm" },
                { value: "1", label: "Nhóm sản phẩm" },
                { value: "2", label: "Nhà cung cấp" },
              ]}
              suffixIcon={
                <UpDownIcon
                  className={`transition fill-primary-color ${
                    isOpenMenu ? "rotate-180" : ""
                  }`}
                />
              }
              className="menu-select-category"
              onDropdownVisibleChange={() => setIsOpenMenu((prev) => !prev)}
              onSelect={handleSelect}
            />
            <div className="h-full w-px bg-[#e6e6e6]"></div>
          </>
        )}
        <div className="icon-search w-5 h-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          className="input-search w-full lg:w-96 placeholder:text-black text-base font-normal line-clamp-1"
          placeholder="Bạn đang muốn tìm sản phẩm nào?"
          value={initialValue || ""}
          onChange={handleInputChange}
          onFocus={onFocusInput}
          onKeyDown={handleEnter}
        />
        <button
          className="transition duration-150 ease-in-out flex justify-center items-center rounded-lg bg-primary-color w-36 h-12 text-white font-medium hover:duration-150"
          onClick={handleAddSearchResult}
        >
          Tìm kiếm
        </button>
      </div>
      {isActivateSearch && (
        <div className="px-4 min-w-full bg-white flex flex-col [&>*:nth-child(2)]:mt-2">
          {histories || suggestion ? (
            <div className="line h-px w-full border-solid border border-gray-100"></div>
          ) : null}
          {histories &&
            histories.length > 0 &&
            histories.map((h, idx) => (
              <SearchHistoryItem
                key={h.id}
                id={h.id}
                item={h.keyword}
                isHighLight={highLightOption === idx}
                closeSearchModal={setIsActivateSearch}
                setKeywordSearch={handleSelectItem}
                getSearchResultAgain={getSearchHistory}
              />
            ))}
          {suggestion &&
            initialValue &&
            initialValue.length > 0 &&
            suggestion.map((su, idx) => (
              <SearchSuggestionItem
                key={su.id}
                item={su.name}
                isHighLight={highLightOption === idx}
                setValue={handleSelectItem}
                onSelect={setIsActivateSearch}
              />
            ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProductSearch;
