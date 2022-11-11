import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import nextArrow from "../../assets/hero/next.png";
import prevArrow from "../../assets/hero/prev.png";

import { useTranslation } from "react-i18next";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import AddToCart from "./AddToCart";
const imageURL = "example.com";

const Hero = ({ slider }) => {
  const { t, i18n } = useTranslation();

  const getConfigurableProps = () => ({
    showStatus: false,
    showIndicators: false,
    infiniteLoop: true,
    showThumbs: false,
    useKeyboardArrows: true,
    autoPlay: true,
    stopOnHover: true,
    swipeable: true,
    dynamicHeight: false,
    emulateTouch: true,
    autoFocus: true,
    transitionTime: 500,
  });
  return (
    <Carousel
      className="heroCarousel"
      {...getConfigurableProps()}
      renderArrowPrev={(onClickHandler, hasPrev) =>
        hasPrev && (
          <div
            onClick={onClickHandler}
            style={{
              position: "absolute",
              zIndex: 2,
              top: "calc(80% + 20px)",
              width: 60,
              height: 60,
              cursor: "pointer",
              right: i18n.dir() === "ltr" ? 15 : "",
              left: i18n.dir() === "ltr" ? "" : 15,
            }}
          >
            <img src={nextArrow} alt="Next" />
          </div>
        )
      }
      renderArrowNext={(onClickHandler, hasNext) =>
        hasNext && (
          <div
            onClick={onClickHandler}
            style={{
              position: "absolute",
              zIndex: 2,
              top: "calc(80% - 15px)",
              width: 60,
              height: 60,
              cursor: "pointer",
              right: i18n.dir() === "ltr" ? 15 : "",
              left: i18n.dir() === "ltr" ? "" : 15,
            }}
          >
            <img src={prevArrow} alt="back" />
          </div>
        )
      }
    >
      {slider.map((item) => (
        <Box
          id="hero"
          key={item.id}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12,1fr)",
            gridTemplateRows: "repeat(5,6rem)",
            gridAutoColumns: "1fr",
            direction: i18n.dir() === "ltr" ? "ltr" : "rtl",
            margin: "3rem 0 1rem 0 ",
          }}
          className="HeroCarouselContainerMobile"
        >
          <Typography
            sx={{
              gridColumnStart: "2",
              gridColumnEnd: "7",
              gridRowStart: "2",
              gridRowEnd: "3",
              fontSize: "4vw",
              fontWeight: "600",
              lineHeight: "1",
              color: "rgba(58, 106, 143, 1)",
              textAlign: i18n.dir() === "ltr" ? "left" : "right",
              direction: i18n.dir() === "ltr" ? "ltr" : "rtl",
            }}
            className="HeroProducsTitleMobile"
          >
            {i18n.dir() === "ltr" ? item.nameEN : item.nameAR}
          </Typography>
          <Typography
            sx={{
              gridColumnStart: "2",
              gridColumnEnd: "7",
              gridRowStart: "3",
              fontSize: "2vw",
              fontWeight: "600",
              alignSelf: "end",
              color: "#214A6A",
              textAlign: i18n.dir() === "ltr" ? "left" : "right",
              direction: i18n.dir() === "ltr" ? "ltr" : "rtl",
            }}
            className="HeroProducsPriceMobile"
          >
            {item.price} {t("description.QAR")}
          </Typography>
          <Typography
            sx={{
              gridColumnStart: "2",
              gridColumnEnd: "7",
              gridRowStart: "4",
              fontSize: "1vw",
              alignSelf: "center",
              color: "#3A6A8F",
              textAlign: i18n.dir() === "ltr" ? "left" : "right",
            }}
            className="HeroProducsDescriptionMobile"
          >
            {i18n.dir() === "ltr" ? item.descriptionEN : item.descriptionAR}
          </Typography>
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              gridColumnStart: "2",
              gridColumnEnd: "7",
              gridRowStart: "5",
              alignSelf: "start",
              justifySelf: "start",
              direction: i18n.dir() === "ltr" ? "ltr" : "rtl",
            }}
            className="HeroProducsActionsMobile"
          >
            <AddToCart item={item} />
          </Box>
          <Box
            sx={{
              position: "relative",
              display: "inline-block",
              height: "100%",
              gridColumnStart: "8",
              gridColumnEnd: "12",
              gridRowStart: "1",
              gridRowEnd: "6",
              justifySelf: "center",
              backgroundColor: "#fce2e2",
              borderRadius: "18px",
              width: "100%",
            }}
            className="HeroImageMobile"
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
            {item.offer === "0" ? (
              ""
            ) : item.offer === null ? (
              ""
            ) : (
              <Typography
                className="offerTextSize"
                variant="body2"
                sx={{
                  position: "absolute",
                  top: "0",
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
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default Hero;
