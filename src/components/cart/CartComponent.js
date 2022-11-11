import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const CartComponent = () => {
  const { i18n } = useTranslation();
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)" }}>
      <Typography
        sx={{
          gridColumnStart: "2",
          gridColumnEnd: "12",
          borderBottom: "1px solid rgba(58, 106, 143, 0.49)",
        }}
      >
        {i18n.dir() === "ltr" ? (
          <Typography sx={{ color: "#3A6A8F", fontSize: "3rem" }}>
            <span style={{ color: "#F5958D", fontSize: "2rem" }}>My</span>
            Cart
          </Typography>
        ) : (
          <Typography sx={{ color: "#3A6A8F", fontSize: "3rem" }}>
            سلتي
          </Typography>
        )}
      </Typography>
    </Box>
  );
};

export default CartComponent;
