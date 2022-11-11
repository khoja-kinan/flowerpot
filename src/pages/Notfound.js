import React from "react";
import { Box, Typography } from "@mui/material";
import notFoundImg from "../assets/notFound/notfound.png";
import left from "../assets/notFound/left.png";
import right from "../assets/notFound/right.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const Notfound = () => {
  const { t, i18n } = useTranslation();
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
      }}
      className="notfoundMobileContainer"
    >
      <img
        src={i18n.dir() === "ltr" ? left : right}
        alt="notfound"
        style={{ width: "60%", justifySelf: "start" }}
        className="display-none"
      />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <img src={notFoundImg} alt="notfound" style={{ width: "100%" }} />
        <Typography sx={{ margin: "2rem 0", fontWeight: "600" }}>
          {" "}
          {t("description.pageNotFound")}{" "}
        </Typography>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            backgroundColor: "#F5958D",
            padding: "10px 10px",
            fontSize: "1rem",
            border: "none",
            borderRadius: "50px",
            width: "30%",
            margin: "0 auto",
          }}
          className="backToHomeMobile"
        >
          {t("description.backToHome")}
        </Link>
      </Box>

      <img
        src={i18n.dir() === "ltr" ? right : left}
        alt="notfound"
        style={{ width: "60%", justifySelf: "flex-end" }}
        className="display-none"
      />
    </Box>
  );
};

export default Notfound;
