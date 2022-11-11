import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import leftPic from "../../assets/categories/left.png";
import rightPic from "../../assets/categories/right.png";

const Categories = ({ categories }) => {
  const { t, i18n } = useTranslation();
  const imageURL = "example.com";

  return (
    <Box
      sx={{
        marginTop: "5rem",
        display: "grid",
        gridTemplateColumns: "repeat(12,1fr)",
        gridTemplateRows: "repeat(2,1fr)",
        gridAutoColumns: "1fr",
        gridAutoRows: "1fr",
      }}
      className="categoriesMainBox"
    >
      <Box
        sx={{
          display: "grid",
          gridColumnStart: "1",
          gridColumnEnd: "13",
          gridTemplateColumns: "repeat(3,1fr)",
          gridAutoColumns: "1fr",
          alignItems: "center",
        }}
      >
        <img
          src={i18n.dir() === "ltr" ? leftPic : rightPic}
          alt="bg"
          className="categoriesImagesMobile"
        />
        {i18n.dir() === "ltr" ? (
          <Typography
            sx={{ color: "#3A6A8F", fontSize: "4vw", justifySelf: "center" }}
            className="categoriesTitleMobile"
          >
            <span
              style={{ color: "#F5958D", fontSize: "2vw" }}
              className="categoriesTitleMobileOur"
            >
              OUR{" "}
            </span>
            CATEGORIES
          </Typography>
        ) : (
          <Typography
            sx={{ color: "#3A6A8F", fontSize: "4vw", justifySelf: "center" }}
            className="categoriesTitleMobileAr"
          >
            فئاتنا
          </Typography>
        )}

        <img
          src={i18n.dir() === "ltr" ? rightPic : leftPic}
          alt="bg"
          className="categoriesImagesMobile"
          style={{ justifySelf: "flex-end" }}
        />
      </Box>
      <Box
        sx={{
          gridColumnStart: "2",
          gridColumnEnd: "12",
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
          columnGap: "3.5rem",
        }}
        className="categoriesContainer"
      >
        {categories.map((item) => (
          <Link
            key={item.id}
            to={`/our-shop/${item.slug}`}
            style={{
              filter: "drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.16))",
              borderRadius: "18px",
              background: `url(${imageURL}${item.photo})`,
              backgroundRepeat: " no-repeat",
              backgroundSize: "100% 90%",
            }}
            className={`categoriesBox caegory${item.slug}`}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "2.5vw",
                  color: "#3A6A8F",
                  position: "absolute",
                  top: "27%",
                  left: i18n.dir() === "ltr" ? "10%" : " ",
                  right: i18n.dir() === "ltr" ? " " : "15%",
                }}
                className="categoriesCardTextMobile"
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

export default Categories;
