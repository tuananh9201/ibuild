import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { MenuDropdown } from "@/components/designs";

interface WrapperDropdownProps {
  openKeys: string[];
  selectedKeys: string[];
  setOpenKeys: Function;
  setSelectedKeys: Function;
  setTitle: Function;
}

const WrapperDropdown = ({
  openKeys,
  selectedKeys,
  setOpenKeys,
  setSelectedKeys,
  setTitle,
}: WrapperDropdownProps) => {
  const router = useRouter();
  const { query } = router;
  const { parentId, currentId } = query;

  return (
    <MenuDropdown
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      setOpenKeys={setOpenKeys}
      setSelectedKeys={setSelectedKeys}
      setTitle={setTitle}
    />
  );
};

export default WrapperDropdown;
