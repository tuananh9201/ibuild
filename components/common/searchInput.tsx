import React from "react";
import style from "@/styles/modules/common/searchInput.module.scss";
import Image from "next/image";
import { searchIcon } from "@/constants/images";
type Props = {};

export default function SearchInput(props: Props) {
  return (
    <div className={style.SearchInput}>
      <div className={style.SearchInput_Input}>
        <Image
          className={style.SearchInput_Input_Icon}
          src={searchIcon}
          alt=""
        />
        <input placeholder="Tìm kiếm văn bản pháp lý...." type="text" />
      </div>
    </div>
  );
}
