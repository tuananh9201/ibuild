"use client";

import { Select } from "antd";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { historyIcon } from "@/constants/images";
import {
  DeleteIcon,
  UpDownIcon,
  SearchIcon,
} from "@/images/icons/product_types/icon_wrapper";
import { ISuggestionKeyword, getSuggestionKeyword } from "@/lib/api/suggestion";
import {
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
  closeSearchModal: Function;
  setKeywordSearch?: Function;
  getSearchResultAgain?: Function;
};

interface ProductSearchProps {
  initialValue: string;
  selectValue?: string;
  onClick?: () => void;
  setInputValueToParent?: Function;
  redirectToSearchPage?: Function;
  onSelectValue?: Function;
}

type SearchSuggestionProps = {
  item: string;
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
        className="flex flex-row items-center gap-4 w-full bg-white p-4  hover:bg-zinc-100 hover:rounded-lg  hover:cursor-pointer"
        onClick={() => selectSelectedProduct(props.item)}
      >
        <div className="icon w-5 h-5">
          <Image src={historyIcon} alt="" />
        </div>
        <div className="font-normal text-base text-black-900 ">
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
      <div className="flex flex-row items-center gap-4 w-full bg-white p-4  hover:bg-zinc-100 hover:rounded-lg  hover:cursor-pointer">
        <div className="icon w-5 h-5">
          <SearchIcon />
        </div>
        <div className="font-normal text-base text-black-900 ">
          {props.item}
        </div>
      </div>
    </div>
  );
};

const ProductSearch = ({
  initialValue,
  selectValue,
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

  const inputRef = useRef<HTMLInputElement>(null);

  const getSearchHistory = async () => {
    const data = await getSearchHistories();
    setHistories(data);
  };

  const debounceValue = useDebounce(initialValue, 500);

  useEffect(() => {
    if (initialValue?.length > 0) return;
    getSearchHistory();
  }, [initialValue]);

  useEffect(() => {
    if (debounceValue && debounceValue?.length) {
      const getSuggestion = async () => {
        const res = await getSuggestionKeyword({
          search_type:
            selectValue === "0"
              ? "PRODUCT"
              : selectValue === "1"
              ? "CATEGORY"
              : "SUPPLIER",
          limit: 5,
          keyword: debounceValue,
        });
        setSuggestion(res);
      };

      getSuggestion();
    }
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

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleChangeStorage = () => {
      const newRole = localStorage.getItem("user_type");
      if (newRole) {
        setUserRole(newRole);
      }
    };

    window.addEventListener("storage", handleChangeStorage);

    return () => window.removeEventListener("storage", handleChangeStorage);
  }, []);
  useEffect(() => {
    if (user?.user_type) {
      setUserRole(user.user_type);
    }
  }, [user]);

  const onFocusInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsActivateSearch(true);
  };
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
    if (setInputValueToParent) {
      setInputValueToParent(e.target.value);
    }
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handler();
    }
  };
  const handleSelect = (value: string) => {
    if (onSelectValue) {
      onSelectValue(value);
    }
  };

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
        {userRole === "expert" && (
          <>
            <Select
              defaultValue={selectValue || "0"}
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
          className="input-search w-full lg:w-96 placeholder:text-black text-base font-normal"
          placeholder="Bạn đang muốn tìm sản phẩm nào?"
          value={initialValue}
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
            (!initialValue || initialValue?.length === 0) &&
            histories.map((h, idx) => {
              if (idx > 4) return;
              return (
                <SearchHistoryItem
                  item={h.keyword}
                  id={h.id}
                  key={h.id}
                  closeSearchModal={setIsActivateSearch}
                  setKeywordSearch={setInputValueToParent}
                  getSearchResultAgain={getSearchHistory}
                />
              );
            })}
          {suggestion &&
            initialValue &&
            initialValue.length > 0 &&
            suggestion.map((su) => (
              <SearchSuggestionItem
                key={su.id}
                item={su.name}
                onSelect={setIsActivateSearch}
                setValue={setInputValueToParent}
              />
            ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProductSearch;
