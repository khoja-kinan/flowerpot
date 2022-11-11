import { Avatar, Box, Button, Input, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Swal from "sweetalert2";
import axios from "axios";
import useState from "react-usestateref";

import { useNavigate } from "react-router-dom";
const EditProfile = () => {
  const token = localStorage.getItem("FlowerPotAuthorisation");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [name, setName, nameRef] = useState("");
  const id = localStorage.getItem("FlowerPotUserID");
  const [password, setPassword] = useState("");
  const [email, setEmail, emailRef] = useState("");
  const [Phone, setPhone, PhoneRef] = useState("");
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setName(localStorage.getItem("FlowerPotUsername"));
    setEmail(localStorage.getItem("FlowerPotUserEmail"));
    setPhone(localStorage.getItem("FlowerPotUserPhone"));
  }, []);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleSave = () => {
    const headers = {
      "X-localization": i18n.language,
      Authorization: "Bearer " + token,
    };
    const formData = new FormData();
    formData.append("id", id);
    name !== localStorage.getItem("FlowerPotUsername") &&
      formData.append("name", name);
    email !== localStorage.getItem("FlowerPotUserEmail") &&
      formData.append("email", email);
    password !== "" && formData.append("password", password);

    formData.append("phone_number", PhoneRef.current);

    axios
      .post("example.com", formData, { headers })
      .then((response) => {
        console.log(response);
        localStorage.setItem(
          "FlowerPotUserPhone",
          response.data.data.phone_number
        );
        setPhone(response.data.data.phone_number);
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 3000,
        });
        navigate(-1);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
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
              <span style={{ color: "#F5958D", fontSize: "2rem" }}>Edit</span>
              Profile
            </Typography>
          ) : (
            <Typography sx={{ color: "#3A6A8F", fontSize: "3rem" }}>
              تعديل ملفي الشخصي
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
            {name.slice(0, 1).toUpperCase()}
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
              <Input value={name} onChange={handleChangeName} />
            </Typography>
            <Typography sx={{ color: "#3A6A8F", fontWeight: "600" }}>
              <span style={{ color: "#F5958D" }}>
                {t("description.UsersPageTableHeadEmail")} :{" "}
              </span>{" "}
              <Input value={email} onChange={handleChangeEmail} />
            </Typography>
            <Typography sx={{ color: "#3A6A8F", fontWeight: "600" }}>
              <span style={{ color: "#F5958D" }}>
                {t("description.NewUserDialogPassword")} :{" "}
              </span>{" "}
              <Input
                type="password"
                value={password}
                onChange={handleChangePassword}
              />
            </Typography>
            <Typography sx={{ color: "#3A6A8F", fontWeight: "600" }}>
              <span style={{ color: "#F5958D" }}>
                {t("description.NewUserDialogPhoneNumber")} :{" "}
              </span>{" "}
              <Input value={PhoneRef.current} onChange={handleChangePhone} />{" "}
              <span style={{ color: "orange", fontSize: "0.7rem" }}>
                ({t("Dashboard.loginFormRequirednumber")})
              </span>{" "}
            </Typography>
          </Box>
          <Box
            sx={{
              justifySelf: "end",
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              gridColumnStart: "9",
              gridColumnEnd: "11",
            }}
            className="profileSaveMobile"
          >
            <Button
              sx={{
                color: "#F5958D",
                fontWeight: "600",
                fontSize: "1rem",
                border: "1px solid #F5958D",
                borderRadius: "50px",
                fontSize: "0.8rem",
              }}
              onClick={handleSave}
            >
              {t("description.Save")}
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default EditProfile;
