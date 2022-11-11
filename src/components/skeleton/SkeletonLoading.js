import { Box, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const SkeletonLoading = () => {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();
  return (
    <>
      <Skeleton height={80} sx={{ width: "95%", margin: "0 auto" }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
          gridTemplateRows: "repeat(6,1fr)",
          marginBottom: "5rem",
        }}
      >
        <Skeleton
          height={80}
          width={"100%"}
          sx={{ gridColumnStart: "2", gridColumnEnd: "5", gridRowStart: "2" }}
        >
          <Typography>.</Typography>
        </Skeleton>
        <Skeleton
          height={80}
          width={"100%"}
          sx={{ gridColumnStart: "2", gridColumnEnd: "5", gridRowStart: "3" }}
        >
          <Typography>.</Typography>
        </Skeleton>
        <Skeleton
          height={80}
          width={"100%"}
          sx={{ gridColumnStart: "2", gridColumnEnd: "5", gridRowStart: "4" }}
        >
          <Typography>.</Typography>
        </Skeleton>
        <Skeleton
          height={80}
          width={"50%"}
          sx={{ gridColumnStart: "2", gridColumnEnd: "5", gridRowStart: "5" }}
        >
          <Typography>.</Typography>
        </Skeleton>
        <Skeleton
          variant="rectangular"
          width="100%"
          sx={{
            gridColumnStart: "7",
            gridColumnEnd: "12",
            gridRowStart: "1",
            gridRowEnd: "7",
          }}
        >
          {" "}
          <div style={{ paddingTop: "57%" }} />
        </Skeleton>
      </Box>

      <Box
        sx={{
          margin: "3rem 0",
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
        }}
      >
        <Skeleton
          height={80}
          width="95%"
          sx={{ gridColumn: "span 12", margin: "0 auto" }}
        />

        <Skeleton
          height={150}
          width={"100%"}
          sx={{ gridColumnStart: "2", gridColumnEnd: "5", gridRowStart: "2" }}
        >
          <Typography>.</Typography>
        </Skeleton>

        <Skeleton
          height={150}
          width={"100%"}
          sx={{ gridColumnStart: "6", gridColumnEnd: "8", gridRowStart: "2" }}
        >
          <Typography>.</Typography>
        </Skeleton>
        <Skeleton
          height={150}
          width={"100%"}
          sx={{ gridColumnStart: "9", gridColumnEnd: "12", gridRowStart: "2" }}
        >
          <Typography>.</Typography>
        </Skeleton>
      </Box>
      <Box
        sx={{
          margin: "3rem 0",
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
        }}
      >
        <Skeleton
          height={80}
          width="40%"
          sx={{ gridColumn: "span 12", margin: "0 auto" }}
        />
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
      </Box>

      <Box
        sx={{
          margin: "3rem 0",
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
        }}
      >
        <Skeleton
          height={80}
          width="40%"
          sx={{ gridColumn: "span 12", margin: "0 auto" }}
        />
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

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          sx={{ gridColumnStart: "1", gridColumnEnd: "2" }}
        >
          {" "}
          <div style={{ paddingTop: "57%" }} />
        </Skeleton>
        <Skeleton
          variant="rectangular"
          width="100%"
          sx={{ gridColumnStart: "3", gridColumnEnd: "4" }}
        >
          {" "}
          <div style={{ paddingTop: "57%" }} />
        </Skeleton>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
          margin: "3rem 0",
        }}
      >
        <Skeleton
          height={80}
          width="30%"
          sx={{ gridColumn: "span 12", margin: "2rem auto" }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          sx={{
            gridColumnStart: "2",
            gridColumnEnd: "6",
            gridRowStart: "2",
            gridRowEnd: "6",
          }}
        >
          {" "}
          <div style={{ paddingTop: "75%" }} />
        </Skeleton>
        <Skeleton
          height={50}
          width="80%"
          sx={{ gridColumnStart: "7", gridColumnEnd: "11" }}
        />
        <Skeleton
          height={50}
          width="80%"
          sx={{ gridColumnStart: "7", gridColumnEnd: "11" }}
        />
        <Skeleton
          height={50}
          width="80%"
          sx={{ gridColumnStart: "7", gridColumnEnd: "11" }}
        />
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

export default SkeletonLoading;
