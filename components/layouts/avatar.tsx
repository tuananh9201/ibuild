import * as React from "react";
import style from "@/styles/modules/avartar.module.scss";
import { Switch, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import Image from "next/image";
import {
  keyboardArrowUp,
  logoutIcon,
  useIcon,
  userAvata,
} from "@/constants/images";
import { User } from "lib/types";
import { useDispatch } from "react-redux";
import { logout } from "store/features/auth/auth";
import { useRouter } from "next/router";
interface IUserAvatarProps {
  user: User;
}

const UserAvatar: React.FunctionComponent<IUserAvatarProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLougout = () => {
    dispatch(logout());
    router.push({
      pathname: "/dang-nhap",
      query: {
        ...router.query,
        redirect: router.pathname,
      },
    });
  };
  const name = props.user.full_name || props.user.email || "Nguyễn Văn A";
  let displayName = name.substring(0, 10);
  if (name.length > 12) displayName += "...";
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          style={{
            display: "flex",
            gap: 8,
            width: "100%",
            padding: 8,
          }}
        >
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
        <div
          style={{
            display: "flex",
            gap: 16,
            width: "100%",
            padding: 8,
          }}
        >
          <span>Chuyên gia </span>
          <Switch checked={props.user?.user_type === "expert"} />
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
        <div
          style={{
            display: "flex",
            gap: 8,
            width: "100%",
            padding: 8,
          }}
        >
          <Image width={20} height={20} src={logoutIcon} alt="" />
          <span>Đăng xuất</span>
        </div>
      ),
    },
  ];
  return (
    <div className={style.Avatar_Area}>
      <Dropdown menu={{ items }}>
        <Space>
          <div>
            <Image width={32} height={32} src={userAvata} alt="user-avatar" />
          </div>
          <span
            style={{
              maxWidth: 100,
            }}
          >
            {displayName}
          </span>
          <Image width={24} height={24} src={keyboardArrowUp} alt="up-icon" />
        </Space>
      </Dropdown>
    </div>
  );
};

export default UserAvatar;
