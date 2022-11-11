import { Box, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useTranslation } from "react-i18next";
import AddDialog from "./AddGialog";
const MayLike = ({ mayLike }) => {
  const { t, i18n } = useTranslation();
  const imageURL = "example.com";
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };

  return (
    <Box
      id="may-like"
      sx={{
        marginTop: "5rem",
        display: "grid",
        gridTemplateColumns: "repeat(12,1fr)",
      }}
    >
      <Typography
        sx={{
          color: "#3A6A8F",
          fontSize: "4vw",
          gridColumnStart: "1",
          gridColumnEnd: "13",
          justifySelf: "center",
        }}
        className="TitleMobile"
      >
        <span
          style={{ color: "#F5958D", fontSize: "2vw" }}
          className="TitleMobileOur"
        >
          {t("description.you")}{" "}
        </span>
        {t("description.MayLike")}
      </Typography>
      <Box
        sx={{
          gridColumnStart: "2",
          gridColumnEnd: "12",
          gridRowStart: "2",
          marginTop: "3rem",
        }}
        className="maylikeCarouselDiv"
      >
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container carousel-container-mayLike"
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-mayLike"
        >
          {mayLike.map((item) => (
            <Card
              key={item.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gridTemplateRows: "16rem 7rem",
                maxWidth: 330,
                width: "250px",
                boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.03)",
                borderRadius: "18px",
                direction: i18n.dir() === "ltr" ? "ltr" : "rtl",
                padding: "1rem",
                margin: "0 1.5rem",
                position: "relative",
              }}
              className="MaylikeCardBoxWidthMobile"
            >
              <Typography
                variant="body2"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: i18n.dir() === "ltr" ? "15%" : " ",
                  right: i18n.dir() === "ltr" ? " " : "10%",
                  color: "white",
                  padding: "0.5rem",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  background: "#3A6A8F",
                  borderRadius: "18px 18px 0px 0px",
                }}
                className="bigScreenPriceAr"
              >
                {i18n.dir() === "ltr"
                  ? `${item.price} QAR`
                  : `${item.price} ريال قطري`}
              </Typography>
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
                    right: "1.5rem",
                    color: "white",
                    padding: "0.5rem",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    background: "#FFDC00",
                    borderRadius: "0px 18px 0px 18px",
                    color: "black",
                    textAlign: "center",
                  }}
                  className="offerRightOffsetMayLike"
                >
                  OFFER <br /> {`${item.offer} %`}
                </Typography>
              )}
              <div
                style={{
                  display: "inline-block",
                  gridColumnStart: "1",
                  gridColumnEnd: "2",
                  gridRowStart: "1",
                  height: "250px",
                  gridRowEnd: "2",
                  backgroundColor: "#fce2e2",
                  borderRadius: "18px",
                }}
              >
                <img
                  src={`${imageURL}${item.photo}`}
                  alt={item.nameEN}
                  style={{
                    display: "inline-block",
                    width: "100%",
                    maxHeight: "100%",
                    borderRadius: "18px",
                  }}
                />
              </div>
              <CardContent
                sx={{
                  padding: "1rem 0.5rem",
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
                    textAlign: i18n.dir() === "ltr" ? "left" : "righ",
                  }}
                >
                  {i18n.dir() === "ltr" ? item.nameEN : item.nameAR}
                </Typography>
                <AddDialog item={item} />
              </CardContent>
            </Card>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default MayLike;
