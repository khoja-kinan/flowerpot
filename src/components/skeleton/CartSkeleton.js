import { Box, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const CartSkeleton = () => {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();
  return (
    <>
      <Skeleton height={80} sx={{ width: "95%", margin: "0 auto" }} />
      <Skeleton height={80} width="30%" sx={{ margin: "3rem 2rem" }} />
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr", rowGap: "2rem" }}>
        <Skeleton variant="rectangular" width="90%" sx={{ margin: "0 auto" }}>
          {" "}
          <div style={{ paddingTop: "15%" }} />
        </Skeleton>
        <Skeleton variant="rectangular" width="90%" sx={{ margin: "0 auto" }}>
          {" "}
          <div style={{ paddingTop: "15%" }} />
        </Skeleton>
        <Skeleton variant="rectangular" width="90%" sx={{ margin: "0 auto" }}>
          {" "}
          <div style={{ paddingTop: "15%" }} />
        </Skeleton>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
          marginTop: "5rem",
          marginBottom: "2rem",
        }}
      >
        <Skeleton
          variant="circular"
          width={150}
          height={150}
          sx={{ gridColumnStart: "2", gridColumnEnd: "4", gridRow: "span 3" }}
        />
        <Skeleton
          height={40}
          width="80%"
          sx={{ gridColumnStart: "5", gridColumnEnd: "8" }}
        />
        <Skeleton
          height={40}
          width="80%"
          sx={{ gridColumnStart: "5", gridColumnEnd: "8" }}
        />
        <Skeleton
          height={40}
          width="80%"
          sx={{ gridColumnStart: "5", gridColumnEnd: "8" }}
        />

        <Skeleton
          height={40}
          width="80%"
          sx={{ gridColumnStart: "9", gridColumnEnd: "12", gridRowStart: "1" }}
        />
        <Skeleton
          height={40}
          width="80%"
          sx={{ gridColumnStart: "9", gridColumnEnd: "12", gridRowStart: "2" }}
        />
        <Skeleton
          height={40}
          width="80%"
          sx={{ gridColumnStart: "9", gridColumnEnd: "12", gridRowStart: "3" }}
        />
      </Box>
    </>
  );
};

export default CartSkeleton;
