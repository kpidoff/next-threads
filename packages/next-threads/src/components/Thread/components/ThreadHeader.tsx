import { Avatar, Box, Chip, Typography } from "@mui/material";
import { Hashtag, ThreadHeaderProps } from "../types";

import React from "react";
import { UserAvatar } from "../../UserAvatar";
import { formatDate } from "../../../utils/dateUtils";
import { useDeviceType } from "../../../hooks/useDeviceType";

export const ThreadHeader: React.FC<ThreadHeaderProps> = ({
  author,
  createdAt,
  content,
  hashtags = [],
}) => {
  const { isMobile } = useDeviceType();

  return (
    <Box display={{ xs: "block", sm: "flex" }} alignItems="flex-start" mb={2}>
      <Box
        display="flex"
        alignItems="flex-start"
        sx={{ width: { sm: "auto" } }}
      >
        <UserAvatar
          avatar={author.avatar}
          name={author.name}
          sx={{
            width: { xs: 40, sm: 48 },
            height: { xs: 40, sm: 48 },
          }}
        />
        <Box ml={2} sx={{ display: { sm: "none" } }}>
          <Box display="flex" alignItems="flex-start" flexDirection="column">
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
              {author.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(createdAt)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box flex={1} mt={{ xs: 2, sm: 0 }} pl={{ xs: 0, sm: 2 }}>
        <Box
          display={{ xs: "none", sm: "flex" }}
          alignItems="flex-start"
          justifyContent="space-between"
          mb={0.5}
        >
          <Box display="flex" alignItems="flex-start" flexDirection="column">
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
              {author.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(createdAt)}
            </Typography>
          </Box>
          {hashtags.length > 0 && (
            <Box display="flex" gap={1} flexWrap="wrap">
              {hashtags.map((hashtag, index) => (
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
        {hashtags.length > 0 && (
          <Box
            display={{ xs: "flex", sm: "none" }}
            gap={1}
            flexWrap="wrap"
            mb={1}
          >
            {hashtags.map((hashtag, index) => (
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
