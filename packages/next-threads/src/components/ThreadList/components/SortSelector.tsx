import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import React from "react";
import { SortOption } from "../types";

interface SortSelectorProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortSelector: React.FC<SortSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel>Trier par</InputLabel>
      <Select
        value={value}
        label="Trier par"
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        <MenuItem value="newest">Plus récent</MenuItem>
        <MenuItem value="oldest">Plus ancien</MenuItem>
        <MenuItem value="mostLiked">Plus aimé</MenuItem>
        <MenuItem value="mostCommented">Plus commenté</MenuItem>
      </Select>
    </FormControl>
  );
};
