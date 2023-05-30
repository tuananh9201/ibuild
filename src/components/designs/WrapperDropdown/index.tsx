import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { MenuDropdown } from "@/components/designs";

interface WrapperDropdownProps {
  onSelect: (id: string) => void;
}

const WrapperDropdown = () => {
  const router = useRouter();
  const { query } = router;
  const { parentId, currentId } = query;

  // state
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <MenuDropdown
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      setOpenKeys={setOpenKeys}
      setSelectedKeys={setSelectedKeys}
    />
  );
};

export default WrapperDropdown;
