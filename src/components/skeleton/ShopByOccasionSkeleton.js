import { Box, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const ShopByOccasionSkeleton = () => {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();
  return (
    <>
      <Skeleton height={80} sx={{ width: "95%", margin: "0 auto" }} />

      <Box
        sx={{
          margin: "3rem 0",
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
        }}
      >
        <Skeleton
          height={80}
          width="30%"
          sx={{ gridColumn: "span 12", margin: "0 2rem" }}
        />
      </Box>

      <Box
        sx={{
          margin: "3rem 0",
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
        }}
      >
        <Grid
          container
          wrap="nowrap"
          sx={{ gridColumnStart: "2", gridColumnEnd: "4", gridRowStart: "2" }}
        >
          <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={"100%"} height={200} />

            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        </Grid>
        <Grid
          container
          wrap="nowrap"
          sx={{ gridColumnStart: "6", gridColumnEnd: "8", gridRowStart: "2" }}
        >
          <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={"100%"} height={200} />

            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        </Grid>
        <Grid
          container
          wrap="nowrap"
          sx={{ gridColumnStart: "10", gridColumnEnd: "12", gridRowStart: "2" }}
        >
          <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={"100%"} height={200} />

            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        </Grid>

        <Grid
          container
          wrap="nowrap"
          sx={{ gridColumnStart: "2", gridColumnEnd: "4", gridRowStart: "3" }}
        >
          <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={"100%"} height={200} />

            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        </Grid>
        <Grid
          container
          wrap="nowrap"
          sx={{ gridColumnStart: "6", gridColumnEnd: "8", gridRowStart: "3" }}
        >
          <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={"100%"} height={200} />

            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        </Grid>
        <Grid
          container
          wrap="nowrap"
          sx={{
            gridColumnStart: "10",
            gridColumnEnd: "12",
            gridRowStart: "3",
          }}
        >
          <Box sx={{ width: "100%", marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={"100%"} height={200} />

            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        </Grid>
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

export default ShopByOccasionSkeleton;
