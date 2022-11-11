import { Box, Button, Link, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import followUsPic from "../../assets/followUs/followUs.png";
import facebook from "../../assets/followUs/facebook.png";
import insta from "../../assets/followUs/insta.png";
import twitter from "../../assets/followUs/twitter.png";
import youtube from "../../assets/followUs/youtube.png";
import whats from "../../assets/followUs/whats.png";
import a from "../../assets/followUs/a.png";
import b from "../../assets/followUs/b.png";
const FollowUs = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(12,1fr)",
        direction: "ltr",
      }}
    >
      <Box
        sx={{
          gridColumnStart: "1",
          gridColumnEnd: "7",
          gridRowStart: "1",
        }}
        className="followUsMainPicMobile"
      >
        <img src={followUsPic} alt={followUsPic} style={{ width: "40vw" }} />
      </Box>
      <Box
        sx={{
          gridColumnStart: "7",
          gridColumnEnd: "13",
          display: "grid",
        }}
        className="followUsIconsMobile"
      >
        <Box
          sx={{
            alignSelf: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            border: "6px solid rgba(245, 149, 141, 0.22)",
            borderRadius: " 133px 0px 0px 133px",
            padding: "4rem 0",
          }}
          className="followUsIconsMobileRadiusBox"
        >
          <Typography
            sx={{ color: "#3A6A8F", fontSize: "2rem", margin: "1.5rem 0" }}
          >
            {t("description.followUs")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link href="example.com" sx={{ textAlign: "center" }}>
              <img src={facebook} alt={facebook} style={{ width: "60%" }} />
            </Link>
            <Link
              href="example.com"
              target={"_blank"}
              sx={{ textAlign: "center" }}
            >
              <img src={insta} alt={insta} style={{ width: "60%" }} />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FollowUs;
