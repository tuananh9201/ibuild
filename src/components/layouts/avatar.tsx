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
import {
  HeartBgWhiteIcon,
  StarIcon,
} from "@/images/icons/product_types/icon_wrapper";
import { RenderImageError } from "../common";
import { getSellImage } from "@/lib/utils";
interface IUserAvatarProps {
  user: User;
}

const UserAvatar: React.FunctionComponent<IUserAvatarProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [userRole, setUserRole] = React.useState("");
  const [avatar, setAvatar] = React.useState("");

  const handleLougout = () => {
    dispatch(logout());
    if (localStorage.getItem("user_type")) {
      localStorage.removeItem("user_type");
    }
    if (localStorage.getItem("search_type")) {
      localStorage.removeItem("search_type");
    }
    router.push({
      pathname: "/dang-nhap",
      query: {
        ...router.query,
        redirect: router.pathname,
      },
    });
  };

  const name = props.user.full_name || props.user.email || "Nguyễn Văn A";
  let displayName = name.substring(0, 13);
  if (name.length > 13) displayName += "...";

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          className="flex gap-2 w-full p-2"
          onClick={() => {
            router.push("/quan-ly-tai-khoan");
          }}
        >
          <Image width={20} height={20} src={useIcon} alt="" />
          <span>Quản lý tài khoản</span>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <div
          className="flex gap-2 w-full p-2 items-center"
          onClick={() => {
            router.push("/quan-ly-tai-khoan?tab=2&tabWatch=1");
          }}
        >
          <HeartBgWhiteIcon className="fill-[#323232]" />
          <span>Danh sách theo dõi</span>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <div
          className="flex gap-2 w-full p-2 items-center"
          onClick={() => {
            router.push("/quan-ly-tai-khoan?openModal=true");
          }}
        >
          <StarIcon className="fill-[#323232]" />
          <span>Nâng cấp tài khoản</span>
        </div>
      ),
    },
    {
      key: "4",
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
    const userType = localStorage.getItem("user_type");
    if (userType) {
      setUserRole(userType);
    }
    if (props.user.user_type && !userType) {
      setUserRole(props.user.user_type);
    }
    setAvatar(props.user?.picture || "");
  }, [props]);

  return (
    <div className="min-w-[247px] min-h-[32px] flex flex-row items-center p-0 gap-2 mb-[6px]">
      <Dropdown menu={{ items }}>
        <Space>
          <div>
            {/* <Image width={32} height={32} src={userAvata} alt="user-avatar" /> */}
            <RenderImageError
              defaultImage={userAvata.src}
              image={getSellImage(avatar)}
              width={32}
              height={32}
              title="user-avatar"
              className="w-8 h-8 rounded-full object-cover overflow-hidden"
            />
          </div>
          {userRole === "expert" && (
            <div className="w-[67px] h-[22px] bg-[#5C84D6] rounded flex items-center justify-center">
              <span className="text-xs leading-[150%] font-normal text-white">
                Chuyên gia
              </span>
            </div>
          )}
          <span className="max-w-full">{displayName}</span>
          <Image
            width={24}
            height={24}
            src={keyboardArrowUp}
            alt="up-icon"
            className="rotate-180"
          />
        </Space>
      </Dropdown>
    </div>
  );
};

export default UserAvatar;
