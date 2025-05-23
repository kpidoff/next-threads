import { Avatar, Box, Chip, Typography } from "@mui/material";
import { Hashtag, ThreadHeaderProps } from "../types";

import React from "react";
import { UserAvatar } from "../../UserAvatar";
import { formatDate } from "../../../utils/dateUtils";

interface ExtendedThreadHeaderProps extends ThreadHeaderProps {
  hashtags?: Hashtag[];
}

export const ThreadHeader: React.FC<ExtendedThreadHeaderProps> = ({
  author,
  createdAt,
  content,
  hashtags = [],
}) => {
  return (
    <Box display="flex" alignItems="flex-start" mb={2}>
      <UserAvatar
        avatar={author.avatar}
        name={author.name}
        sx={{
          width: 48,
          height: 48,
        }}
      />
      <Box flex={1} ml={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={0.5}
        >
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mr: 1 }}>
              {author.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(createdAt)}
            </Typography>
          </Box>
          {hashtags.length > 0 && (
            <Box display="flex" gap={1} flexWrap="wrap">
              {hashtags.map((hashtag: Hashtag, index: number) => (
                <Chip
                  key={index}
                  label={`#${hashtag.label}`}
                  size="small"
                  sx={{
                    backgroundColor: hashtag.color,
                    color: "white",
                    "&:hover": {
                      backgroundColor: hashtag.color,
                      opacity: 0.8,
                    },
                  }}
                />
              ))}
            </Box>
          )}
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
