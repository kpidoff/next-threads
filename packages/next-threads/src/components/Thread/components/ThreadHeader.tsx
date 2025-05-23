import { Avatar, Box, Typography } from "@mui/material";

import React from "react";
import { ThreadHeaderProps } from "../types";
import { UserAvatar } from "../../UserAvatar";
import moment from "moment";

export const ThreadHeader: React.FC<ThreadHeaderProps> = ({
  author,
  createdAt,
  content,
}) => {
  return (
    <Box display="flex" alignItems="flex-start" mb={2}>
      <UserAvatar
        avatar={author.avatar}
        name={author.name}
        sx={{
          width: 48,
          height: 48,
          mr: 2,
        }}
      />
      <Box flex={1}>
        <Box display="flex" alignItems="center" mb={0.5}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mr: 1 }}>
            {author.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {moment(createdAt).format("LLL")}
          </Typography>
        </Box>
        <Box
          sx={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            lineHeight: 1.6,
          }}
        >
          {content}
        </Box>
      </Box>
    </Box>
  );
};
