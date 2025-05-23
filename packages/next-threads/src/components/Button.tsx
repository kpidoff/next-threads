import { ButtonProps, Button as MuiButton } from "@mui/material";

import React from "react";

export const Button = (props: ButtonProps) => {
  return (
    <>
      <MuiButton
        {...props}
        sx={{
          borderRadius: "8px",
          textTransform: "none",
          ...props.sx,
        }}
      />
      test123456
    </>
  );
};
