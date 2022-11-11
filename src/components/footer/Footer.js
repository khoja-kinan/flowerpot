import { Box, Link, Typography } from "@mui/material";
import line from "../../assets/footer/line.png";
import logo from "../../assets/footer/footerLogo.png";
import facebook from "../../assets/followUs/facebook.png";
import insta from "../../assets/followUs/insta.png";
// import twitter from "../../assets/followUs/twitter.png";
// import youtube from "../../assets/followUs/youtube.png";
import whats from "../../assets/followUs/whats.png";
// import a from "../../assets/followUs/a.png";
// import b from "../../assets/followUs/b.png";
import { useTranslation } from "react-i18next";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  const { t } = useTranslation();
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -100;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)" }}>
      <Box
        sx={{ gridColumnStart: "1", gridColumnEnd: "13", marginBottom: "1rem" }}
      >
        <img
          src={line}
          alt="line"
          style={{ width: "100%", maxWidth: "100%" }}
        />
      </Box>
      <Box
        sx={{
          gridColumnStart: "2",
          gridColumnEnd: "12",
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
          borderBottom: "1px solid #3A6A8F",
          paddingBottom: "1rem",
        }}
      >
        <Box
          sx={{
            gridColumnStart: "1",
            gridColumnEnd: "5",
          }}
          className="footerLogoMobile"
        >
          <img src={logo} alt="footer logo" style={{ width: "70%" }} />
        </Box>
        <Box
          sx={{
            gridColumnStart: "6",
            gridColumnEnd: "9",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
          }}
          className="footerShopMobile"
        >
          <Typography
            sx={{ color: "#3A6A8F", fontSize: "1.5rem" }}
            className="footerShopTextSize"
          >
            {t("description.SHOP")}
          </Typography>
          <HashLink
            smooth
            to={"/#may-like"}
            scroll={(el) => scrollWithOffset(el)}
            style={{
              margin: "1rem 0",
              textDecoration: "none",
              color: "rgba(58, 106, 143, 0.6) ",
            }}
            className="footerShopLinkTextSize"
          >
            {t("description.ShopbyFlower")}
          </HashLink>

          <HashLink
            smooth
            to={"/#shop-by-occcasion"}
            scroll={(el) => scrollWithOffset(el)}
            style={{
              margin: "0.5rem 0",
              textDecoration: "none",
              color: "rgba(58, 106, 143, 0.6) ",
            }}
            className="footerShopLinkTextSize"
          >
            {t("description.ShopbyOccasoin")}
          </HashLink>
        </Box>
        <Box
          sx={{
            gridColumnStart: "9",
            gridColumnEnd: "13",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
          }}
          className="footerContactUsMobile"
        >
          <Typography sx={{ color: "#3A6A8F", fontSize: "1.5rem" }}>
            {t("description.ContactUs")}
          </Typography>
          <Link
            style={{
              textDecoration: "none",
              color: "rgba(58, 106, 143, 0.6)",
              margin: "1rem 0",
              direction: "ltr",
            }}
            href={`tel:+97440011870`}
          >
            +97440011870
          </Link>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link
              href="example.com"
              sx={{ margin: "0", padding: "0", minWidth: "20%" }}
            >
              <img
                src={facebook}
                alt={facebook}
                style={{ width: "50%", margin: "0" }}
              />
            </Link>
            <Link
              href="example.com"
              target={"_blank"}
              sx={{ margin: "0", padding: "0", minWidth: "20%" }}
            >
              <img
                src={whats}
                alt={whats}
                style={{ width: "50%", margin: "0" }}
              />
            </Link>
            <Link
              href="example.com"
              target={"_blank"}
              sx={{ margin: "0", padding: "0", minWidth: "20%" }}
            >
              <img
                src={insta}
                alt={insta}
                style={{ width: "50%", margin: "0" }}
              />
            </Link>
          </Box>
          <Box
            sx={{
              width: "80%",
              margin: "1rem 0 ",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {" "}
            <HashLink
              smooth
              to={"/privacy-policy"}
              scroll={(el) => scrollWithOffset(el)}
              style={{
                margin: "0.5rem 0",
                textDecoration: "none",
                color: "rgba(58, 106, 143, 0.6) ",
              }}
              className="footerShopLinkTextSize"
            >
              {t("description.privacyPolicy")}
            </HashLink>
            <HashLink
              smooth
              to={"/terms-of-service"}
              scroll={(el) => scrollWithOffset(el)}
              style={{
                margin: "0.5rem 0",
                textDecoration: "none",
                color: "rgba(58, 106, 143, 0.6) ",
              }}
              className="footerShopLinkTextSize"
            >
              {t("description.termsOfService")}
            </HashLink>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          gridColumnStart: "2",
          gridColumnEnd: "12",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "1rem 0 ",
        }}
      >
        <Typography sx={{ color: "#3A6A8F" }} className="footerCopyRights">
          {t("description.allRights")}
          {t("description.development")}
          <a
            href="https://nic-lb.com/"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            {" "}
            NIC Group{" "}
          </a>
          {t("description.company")}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
