import Image from "next/image";
import * as React from "react";
import { Dropdown, Space, Switch } from "antd";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { User } from "src/lib/types";
import { logout } from "src/store/features/auth/auth";
import type { MenuProps } from "antd";
import {
  keyboardArrowUp,
  logoutIcon,
  useIcon,
  userAvata,
} from "@/constants/images";
interface IUserAvatarProps {
  user: User;
}

const UserAvatar: React.FunctionComponent<IUserAvatarProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [userRole, setUserRole] = React.useState("");

  const handleLougout = () => {
    dispatch(logout());
    if (localStorage.getItem("user_type")) {
      localStorage.removeItem("user_type");
    }
    router.push({
      pathname: "/dang-nhap",
      query: {
        ...router.query,
        redirect: router.pathname,
      },
    });
  };
  const handleCheck = (value: boolean) => {
    if (value) {
      localStorage.setItem("user_type", "expert");
      window.dispatchEvent(new Event("storage"));
    } else {
      localStorage.setItem("user_type", "user");
      window.dispatchEvent(new Event("storage"));
    }
  };

  const name = props.user.full_name || props.user.email || "Nguyễn Văn A";
  let displayName = name.substring(0, 13);
  if (name.length > 13) displayName += "...";

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex gap-2 w-full p-2">
          <Image width={20} height={20} src={useIcon} alt="" />
          <span>Thông tin tài khoản</span>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <div className="flex gap-4 w-full p-2">
          <span>Chuyên gia </span>
          <Switch
            defaultChecked={userRole === "expert"}
            onChange={handleCheck}
          />
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      onClick: () => {
        handleLougout();
      },
      label: (
        <div className="flex gap-2 w-full p-2">
          <Image width={20} height={20} src={logoutIcon} alt="" />
          <span>Đăng xuất</span>
        </div>
      ),
    },
  ];

  React.useEffect(() => {
    const handleChangeStorage = () => {
      const newRole = localStorage.getItem("user_type");
      if (newRole) {
        setUserRole(newRole);
      }
    };

    window.addEventListener("storage", handleChangeStorage);

    return () => window.removeEventListener("storage", handleChangeStorage);
  }, []);

  React.useEffect(() => {
    const userType = localStorage.getItem("user_type");
    if (userType) {
      setUserRole(userType);
    }
    if (props.user.user_type && !userType) {
      setUserRole(props.user.user_type);
    }
  }, [props]);

  return (
    <div className="min-w-[247px] min-h-[32px] flex flex-row items-center p-0 gap-2 mb-[6px]">
      <Dropdown menu={{ items }}>
        <Space>
          <div>
            <Image width={32} height={32} src={userAvata} alt="user-avatar" />
          </div>
          {userRole === "expert" && (
            <div className="w-[67px] h-[22px] bg-[#5C84D6] rounded flex items-center justify-center">
              <span className="text-xs leading-[150%] font-normal text-white">
                Chuyên gia
              </span>
            </div>
          )}
          <span className="max-w-full">{displayName}</span>
          <Image width={24} height={24} src={keyboardArrowUp} alt="up-icon" />
        </Space>
      </Dropdown>
    </div>
  );
};

export default UserAvatar;
