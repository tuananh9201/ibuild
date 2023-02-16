import * as React from "react";
import style from "@/styles/modules/avartar.module.scss";
import { Avatar, Switch, Dropdown, Space } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import Image from "next/image";
import { logoutIcon, useIcon } from "@/constants/images";
import { User } from "lib/types";
import user from "store/features/user/user";

interface IUserAvatarProps {
  user: User;
}
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
        <Switch checked={false} />
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
const UserAvatar: React.FunctionComponent<IUserAvatarProps> = (props) => {
  return (
    <div className={style.Avatar_Area}>
      <Avatar size={24} icon={<UserOutlined />} />
      <Dropdown menu={{ items }}>
        <Space>
          {props.user.full_name || props.user.email}
          <DownOutlined />
        </Space>
      </Dropdown>
    </div>
  );
};

export default UserAvatar;
