import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { useTranslation } from "react-i18next";
import BG from "../assets/aboutUs/aboutUsBg.png";
const AboutUs = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
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
          background: `url(${BG})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom right",
          backgroundSize: "contain",
        }}
      >
        <Box
          sx={{
            margin: "1rem 0",
            padding: "1rem 0 ",
            gridColumnStart: "2",
            gridColumnEnd: "12",
            borderBottom: "1px solid rgba(58, 106, 143, 0.49)",
          }}
        >
          {i18n.dir() === "ltr" ? (
            <Typography sx={{ color: "#3A6A8F", fontSize: "3rem" }}>
              <span style={{ color: "#F5958D", fontSize: "2rem" }}>About</span>
              Us
            </Typography>
          ) : (
            <Typography sx={{ color: "#3A6A8F", fontSize: "3rem" }}>
              من نحن
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            gridColumnStart: "2",
            gridColumnEnd: "10",
            gridRowStart: "2",
            margin: "5rem 0 ",
          }}
        >
          <Typography
            sx={{ color: "#3A6A8F", fontWeight: "500" }}
            className="aboutUsPageTextSize"
          >
            {i18n.dir() === "ltr"
              ? "FLOWER POT Floral & Gift Centre is one of the best floral company  established in the state of Qatar in the floral industry. We provide a wide range of Floral services for all occasions. Apart from mass market, we are also involved in events & functions, floral supply and much more. Tailor-made-to event is our goal that caters to the requirements and preferences of our customers."
              : "مركز الزهور والهدايا هو واحد من أفضل شركات الأزهار التي تأسست في دولة قطر في صناعة الأزهار. نقدم مجموعة واسعة من خدمات الأزهار لجميع المناسبات. بصرف النظر عن السوق الشامل ، نشارك أيضًا في الأحداث والوظائف ، وتوريد الأزهار وغير ذلك الكثير. هدفنا هو تلبية متطلبات وتفضيلات عملائنا."}
          </Typography>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AboutUs;
