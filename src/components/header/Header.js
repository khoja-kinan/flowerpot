import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../assets/flowersLogo.png";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

import { HashLink } from "react-router-hash-link";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Zoom from "@mui/material/Zoom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useTranslation } from "react-i18next";
import lang from "../../assets/footer/lang.png";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SignInDialog from "./SignInDialog";
import LanguagePopover from "../LanguagePopover";
import AccountPopover from "../AccountPopover";
import axios from "axios";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const pages = [
  { nameEn: "Home", nameAr: "الرئيسية", href: "/#hero" },
  { nameEn: "About Us", nameAr: "من نحن", href: "/about" },
  { nameEn: "Shop", nameAr: "المتجر", href: "/our-shop/all" },
  { nameEn: "Contact", nameAr: "تواصل معنا", href: "/#contactUs" },
];
const scrollWithOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -100;
  window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
};
const Header = (props) => {
  const URL = `example.com`;
  const [cart, setCart] = React.useState();
  const [state, setState] = React.useState();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { t, i18n } = useTranslation();
  const [user, setUser] = React.useState({
    userName: "",
    email: "",
    token: "",
  });
  let cartIconNumber = cart === undefined ? "0" : cart.length;
  React.useEffect(() => {
    setUser({
      userName: localStorage.getItem("FlowerPotUsername"),
      email: localStorage.getItem("FlowerPotUserEmail"),
      token: localStorage.getItem("FlowerPotAuthorisation"),
    });

    async function fecthData() {
      await axios
        .get(URL, {
          headers: {
            "X-localization": i18n.language,
            Authorization:
              "Bearer " + localStorage.getItem("FlowerPotAuthorisation"),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data.data;
            setCart(data);
            setState(response.data.message);
          }
        })
        .catch((error) => {
          setState(error.response.message);
        });
    }
    fecthData();
  }, []);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  /* scroll to top */
  function ScrollTop(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100,
    });
    const handleClick = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };

    return (
      <Zoom in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: "2",
            color: "#f5958d",
          }}
        >
          {children}
        </Box>
      </Zoom>
    );
  }

  return (
    <>
      <AppBar
        id="#home"
        position="sticky"
        className="AppBarMobile"
        sx={{
          backgroundColor: "#ffffff",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            zIndex: "999",
            color: "black",
            backgroundColor: "#f7f7fd",
            padding: "0.3rem 0",
          }}
        >
          <Box
            className="topHeader"
            sx={{
              gridColumnStart: "2",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocalShippingIcon color="action" sx={{ margin: "0 0.3rem" }} />{" "}
              {t("description.freeShipping")}
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", margin: "0 1rem" }}
            >
              <LocalPhoneIcon color="action" sx={{ margin: "0 0.3rem" }} />{" "}
              <MuiLink
                href={`tel:+97440011870`}
                sx={{
                  textDecoration: "none",
                  color: "#727174",
                }}
              >
                {i18n.dir() === "ltr" ? "+ 97440011870" : "97440011870 +"}
              </MuiLink>
            </Box>
          </Box>
        </Box>
        <Container maxWidth="xl" className="HeaderContainer">
          <Toolbar disableGutters id="back-to-top-anchor">
            <Link style={{ cursor: "pointer" }} to={{ pathname: "/" }}>
              <img
                src={Logo}
                alt={"logo"}
                height={"70vw"}
                width={"100%"}
                className="headerLogo"
              />
            </Link>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "end",
              }}
            >
              {pages.map((page) => (
                <HashLink
                  key={page.nameEn}
                  smooth
                  to={page.href}
                  scroll={(el) => scrollWithOffset(el)}
                  style={{ textDecoration: "none", margin: "0 0.7rem" }}
                >
                  <Button
                    sx={{
                      my: 2,
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: "black",
                      display: "block",
                      textTransform: "none",
                      "&.MuiButtonBase-root:hover": {
                        bgcolor: "transparent",
                        color: "#E87B5A",
                      },
                      "&.MuiButtonBase-root:after": {
                        content: '" "',
                        position: "absolute",
                        left: "0",
                        bottom: "-2px",
                        width: "0px",
                        height: "2px",
                        background: "#E87B5A",

                        transition: "all 0.45s",
                      },
                      "&.MuiButtonBase-root:hover:after": {
                        width: "60%",
                        left: "8px",
                      },
                      "&.MuiButtonBase-root:focus": {
                        color: "#E87B5A",
                      },
                      "&.MuiButtonBase-root:focus:after": {
                        width: "60%",
                        left: "8px",
                        background: "#E87B5A",
                      },
                    }}
                    className="headerLinks"
                  >
                    {i18n.dir() === "ltr" ? page.nameEn : page.nameAr}
                  </Button>
                </HashLink>
              ))}
            </Box>
            <Box sx={{ margin: "0 0.3rem" }} className="cartBox">
              <Link to={"/cart"} style={{ textDecoration: "none" }}>
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={cartIconNumber} color="warning">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </Link>
            </Box>
            <Box sx={{ margin: "0 1rem" }} className="mobileLanguageMargin">
              <LanguagePopover lang={lang} />
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              {" "}
              {user.userName === null ? (
                <SignInDialog />
              ) : (
                <AccountPopover user={user} />
              )}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="warning"
              >
                <MenuIcon sx={{ fontSize: "2rem" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.nameEn} onClick={handleCloseNavMenu}>
                    <HashLink
                      smooth
                      to={page.href}
                      style={{ textDecoration: "none", color: "#E87B5A" }}
                    >
                      <Typography textAlign="center">
                        {i18n.dir() === "ltr" ? page.nameEn : page.nameAr}
                      </Typography>
                    </HashLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              {user.userName === null ? (
                <SignInDialog />
              ) : (
                <AccountPopover user={user} />
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <ScrollTop {...props}>
        <Fab
          size="small"
          aria-label="scroll back to top"
          sx={{
            backgroundColor: "#f5958d",
            color: "white",
            ":hover": {
              backgroundColor: "#f6958d",
              color: "white",
            },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};
export default Header;
