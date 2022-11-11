import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ShopByOccasion = ({ occasion }) => {
  const { t, i18n } = useTranslation();
  const imageURL = "example.com";

  return (
    <Box
      id="shop-by-occcasion"
      sx={{
        marginTop: "5rem",
        display: "grid",
        gridTemplateColumns: "repeat(12,1fr)",
        gridTemplateRows: "1fr 32rem",
        rowGap: "2rem",
      }}
      className="shopByOccasionContainerBoxMobile"
    >
      <Typography
        sx={{
          color: "#F5958D",
          fontSize: "2vw",
          gridColumnStart: "1",
          gridColumnEnd: "13",
          justifySelf: "center",
        }}
        className="TitleMobile"
      >
        <span
          style={{ color: "#3A6A8F", fontSize: "4vw" }}
          className="TitleMobileOur"
        >
          {t("description.shop")}{" "}
        </span>
        {t("description.byOccasion")}
      </Typography>
      <Box
        sx={{
          gridRowStart: "2",
          gridColumnStart: "2",
          gridColumnEnd: "12",
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
          columnGap: "3rem",
          rowGap: "3rem",
        }}
        className="shopByOccasionBoxContainer"
      >
        {occasion.map((item) => (
          <Link
            key={item.id}
            to={`/shop-by-occasion/${item.slug}`}
            style={{
              filter: "drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.16))",
              borderRadius: "18px",
              background: `url(${imageURL}${item.photo})`,
              backgroundRepeat: " no-repeat",
              backgroundSize: "100% 100%",
            }}
            className={`shopByOccasionBox byOccasionBoxMobile occasionCard${item.slug}`}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "2.5vw",
                  color: "#3A6A8F",
                  position: "absolute",
                  top: "30%",
                  left: i18n.dir() === "ltr" ? "10%" : " ",
                  right: i18n.dir() === "ltr" ? " " : "15%",
                }}
                className="byOccasionTextSizeMobile"
              >
                {i18n.dir() === "ltr" ? item.name_en : item.name_ar}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default ShopByOccasion;
