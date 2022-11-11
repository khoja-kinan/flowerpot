import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const MyProfile = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [user, setUser] = React.useState({
    userName: "",
    email: "",
    token: "",
    phone: "",
  });
  React.useEffect(() => {
    setUser({
      userName: localStorage.getItem("FlowerPotUsername"),
      email: localStorage.getItem("FlowerPotUserEmail"),
      token: localStorage.getItem("FlowerPotAuthorisation"),
      phone: localStorage.getItem("FlowerPotUserPhone"),
    });
  }, []);
  const logOut = () => {
    const headers = {
      Authorization: "Bearer " + user.token,
    };
    axios
      .post("example.com", { headers })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    localStorage.removeItem("FlowerPotUsername");
    localStorage.removeItem("FlowerPotUserEmail");
    localStorage.removeItem("FlowerPotAuthorisation");
    localStorage.removeItem("FlowerPotUserPhone");
    navigate("/");
  };
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
          gridTemplateRows: "1fr",
          gap: "2rem",
          margin: "2rem 0 ",
        }}
      >
        <Typography
          sx={{
            gridColumnStart: "2",
            gridColumnEnd: "12",
            borderBottom: "1px solid rgba(58, 106, 143, 0.49)",
            padding: "1rem 0 ",
          }}
        >
          {i18n.dir() === "ltr" ? (
            <Typography sx={{ color: "#3A6A8F", fontSize: "3rem" }}>
              <span style={{ color: "#F5958D", fontSize: "2rem" }}>My</span>
              Profile
            </Typography>
          ) : (
            <Typography sx={{ color: "#3A6A8F", fontSize: "3rem" }}>
              ملفي الشخصي
            </Typography>
          )}
        </Typography>
        <Box
          sx={{
            gridRowStart: "2",
            gridColumnStart: "2",
            gridColumnEnd: "12",
            display: "grid",
            gridTemplateColumns: "repeat(10,1fr)",
            gridTemplateRows: "auto",
            background: "#FEFEFE",
            boxShadow: "0px 8.31034px 21.3695px rgba(134, 136, 239, 0.37)",
            borderRadius: "18px",
            padding: "1rem",
            columnGap: "2rem",
          }}
        >
          <Avatar
            sx={{
              gridColumnStart: "1",
              gridColumnEnd: "3",
              alignSelf: "center",
              width: 150,
              height: 150,
              bgcolor: "#3a6a8f",
              margin: "0 auto",
              fontSize: "5vw",
            }}
            className="profileAvatarMobile"
          >
            {user.userName.slice(0, 1).toUpperCase()}
          </Avatar>
          <Box
            className="profileInfoMobile"
            sx={{
              gridColumnStart: "3",
              gridColumnEnd: "9",
              display: "grid",
              gridTemplateColumns: "1fr",
              gridTemplateRows: "repeat(4,3rem)",
            }}
          >
            <Typography sx={{ color: "#F5958D", fontWeight: "600" }}>
              {t("description.PersonalInfo")}
            </Typography>
            <Typography sx={{ color: "#3A6A8F", fontWeight: "600" }}>
              <span style={{ color: "#F5958D" }}>
                {t("description.UsersPageTableHeadUsername")} :{" "}
              </span>{" "}
              {localStorage.getItem("FlowerPotUsername")}
            </Typography>
            <Typography sx={{ color: "#3A6A8F", fontWeight: "600" }}>
              <span style={{ color: "#F5958D" }}>
                {t("description.UsersPageTableHeadEmail")} :{" "}
              </span>{" "}
              {localStorage.getItem("FlowerPotUserEmail")}
            </Typography>
            <Typography sx={{ color: "#3A6A8F", fontWeight: "600" }}>
              <span style={{ color: "#F5958D" }}>
                {t("description.NewUserDialogPassword")} :{" "}
              </span>{" "}
              ********
            </Typography>
            <Typography sx={{ color: "#3A6A8F", fontWeight: "600" }}>
              <span style={{ color: "#F5958D" }}>
                {t("description.NewUserDialogPhoneNumber")} :{" "}
              </span>{" "}
              {localStorage.getItem("FlowerPotUserPhone")}
            </Typography>
          </Box>
          <Box
            className="profileSignOutAndEditMobile"
            sx={{
              justifySelf: "end",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gridColumnStart: "9",
              gridColumnEnd: "11",
            }}
          >
            <Link to="/edit-profile" style={{ textDecoration: "none" }}>
              <IconButton
                sx={{ color: "#F5958D", fontWeight: "600", fontSize: "1rem" }}
                className="noBackgorundOnHover"
              >
                {t("description.edit")} <EditIcon />
              </IconButton>
            </Link>
            <IconButton
              sx={{
                color: "#F5958D",
                fontWeight: "600",
                border: "1px solid #F5958D",
                borderRadius: "50px",
                fontSize: "0.8rem",
              }}
              onClick={logOut}
            >
              {t("description.AccountPopoverLogout")} <ExitToAppIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default MyProfile;
