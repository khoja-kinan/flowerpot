import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddDialog from "../components/mayLike/AddGialog";
import { LinearProgress } from "@mui/material";
import ShopByOccasionSkeleton from "../components/skeleton/ShopByOccasionSkeleton";

const ShopByOccasionPage = () => {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const imageURL = "example.com";
  const URL = `example.comapi/occasions/${slug}/flowers`;
  useEffect(() => {
    async function fecthData() {
      await axios
        .get(URL, {
          headers: {
            "X-localization": i18n.language,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data.data;
            setData(data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
    fecthData();
  }, []);
  return loading ? (
    <ShopByOccasionSkeleton />
  ) : (
    <Box
      sx={{
        background:
          "linear-gradient(359.04deg, #FEF2F1 -89.99%, #F5F8FF 119.48%)",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
        }}
      >
        <Box
          sx={{
            marginTop: "2rem",
            padding: "1rem",
            gridColumnStart: "2",
            gridColumnEnd: "12",
            borderBottom: "1px solid rgba(58, 106, 143, 0.49)",
            color: "#667085",
            fontSize: "1.5vw",
            alignItems: "center",
          }}
          className="occasionPageHeaderTextSize"
        >
          {i18n.dir() === "ltr" ? "Shop" : "المتجر"}{" "}
          {i18n.dir() === "ltr" ? (
            <ArrowForwardIosIcon fontSize="small" />
          ) : (
            <ArrowBackIosIcon fontSize="small" />
          )}{" "}
          {i18n.dir() === "ltr" ? "By Occasion" : "المناسبة"}
          {i18n.dir() === "ltr" ? (
            <ArrowForwardIosIcon fontSize="small" />
          ) : (
            <ArrowBackIosIcon fontSize="small" />
          )}{" "}
          {i18n.dir() === "ltr" ? data.occasion.name_en : data.occasion.name_ar}
        </Box>

        <Box
          sx={{
            gridColumnStart: "2",
            gridColumnEnd: "12",
            display: "grid",
            gridTemplateColumns: "repeat(12,1fr)",
            margin: "4rem 0",
            gap: "4rem",
          }}
          className="occasionPageCardsBoxContainerStyle"
        >
          {data.flower.length === 0 ? (
            <Typography
              sx={{
                gridColumnStart: "1",
                gridColumnEnd: "4",
                color: "#667085",
                fontSize: "1.5vw",
              }}
              className="nothingToShowTextSize mobileHeight"
            >
              {i18n.dir() === "ltr"
                ? "Nothing To Show"
                : "لا يوجد عناصر لعرضها"}
            </Typography>
          ) : (
            data.flower.map((item) => (
              <Card
                key={item.id}
                sx={{
                  position: "relative",
                  gridColumn: "span 4",
                  boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.03)",
                  borderRadius: "18px",
                  direction: i18n.dir() === "ltr" ? "ltr" : "rtl",
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gridTemplateRows: "18rem 5rem",
                  maxWidth: 330,
                  width: "270px",

                  padding: "1rem",
                  paddingBottom: "0",
                  margin: "0 1rem",
                }}
                className="occasionPageCardsBoxStyle"
              >
                <div
                  style={{
                    display: "inline-block",
                    height: "100%",
                    gridColumnStart: "1",
                    gridColumnEnd: "2",
                    gridRowStart: "1",
                    gridRowEnd: "2",
                    backgroundColor: "#fce2e2",
                    borderRadius: "18px",
                  }}
                >
                  <img
                    src={`${imageURL}${item.photo}`}
                    alt={item.photo}
                    style={{
                      display: "inline-block",
                      height: "100%",
                      width: "100%",
                      borderRadius: "18px",
                    }}
                  />
                </div>
                {item.offer === "0" ? (
                  ""
                ) : item.offer === null ? (
                  ""
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: "0",
                      padding: "0.5rem",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      background: "#FFDC00",
                      borderRadius: "0px 18px 0px 18px",
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    OFFER <br /> {`${item.offer} %`}
                  </Typography>
                )}
                <CardContent
                  sx={{
                    marginTop: "1rem",
                    padding: "0 0.3rem 0 0",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#3A6A8F",
                      padding: "0 1rem",
                      fontSize: "1.2rem",
                    }}
                    className="productFontSize"
                  >
                    {i18n.dir() === "ltr" ? item.nameEN : item.nameAR}
                  </Typography>
                  <AddDialog item={item} />
                </CardContent>
                <CardActions sx={{ padding: "0" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      position: "relative",
                      bottom: 0,
                      left: i18n.dir() === "ltr" ? "15%" : " ",
                      right: i18n.dir() === "ltr" ? " " : "20%",
                      color: "white",
                      padding: "0.5rem",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      background: "#3A6A8F",
                      borderRadius: "18px 18px 0px 0px",
                    }}
                  >
                    {i18n.dir() === "ltr"
                      ? `${item.price} QAR`
                      : `${item.price} ريال قطري`}
                  </Typography>
                </CardActions>
              </Card>
            ))
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ShopByOccasionPage;
