import { Avatar, AvatarProps } from "@mui/material";

import React from "react";
import { User } from "../types/types";

interface UserAvatarProps extends Omit<AvatarProps, "src"> {
  avatar?: User["avatar"];
  name: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  avatar,
  name,
  ...props
}) => {
  if (!avatar) {
    return (
      <Avatar alt={name} {...props}>
        {name.charAt(0).toUpperCase()}
      </Avatar>
    );
  }

  if (React.isValidElement(avatar)) {
    return avatar;
  }

  return (
    <Avatar
      src={typeof avatar === "string" ? avatar : undefined}
      alt={name}
      {...props}
    />
  );
};
