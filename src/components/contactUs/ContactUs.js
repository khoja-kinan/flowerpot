import { Box, Chip, FormControl, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import mail from "../../assets/contact/mail.png";
import phone from "../../assets/contact/phone.png";
import location from "../../assets/contact/location.png";
import bg from "../../assets/contact/tree.png";
import axios from "axios";
import Swal from "sweetalert2";
import { contactUsUrl } from "../dashboard/constants/urls";
const ContactUs = () => {
  const { t, i18n } = useTranslation();
  const [FormName, setName] = useState();
  const [FormEmail, setEmail] = useState();
  const [FormMessage, setMessage] = useState();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmitContactUs = () => {
    const data = {
      name: FormName,
      email: FormEmail,
      message: FormMessage,
    };
    axios
      .post(contactUsUrl, data, {
        headers: {
          "X-localization": i18n.language,
        },
      })
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(12,1fr)",
        background: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom right",
        paddingBottom: "12rem",
      }}
      className="contactUsMainBoxMobile"
    >
      <Typography
        id="contactUs"
        sx={{
          color: "#3A6A8F",
          fontSize: "4vw",
          gridColumnStart: "1",
          gridColumnEnd: "13",
          justifySelf: "center",
        }}
        className="byOccasionTextSizeMobile"
      >
        {t("description.contactUs")}
      </Typography>
      <Box
        sx={{
          gridColumnStart: "2",
          gridColumnEnd: "12",
          marginTop: "3rem",
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
        }}
      >
        <FormControl
          data-aos="zoom-in-down"
          data-aos-duration="1500"
          sx={{
            gridColumnStart: "2",
            gridColumnEnd: "7",
          }}
          className="contactUsFormControlMobile"
        >
          <TextField
            className="palceholderFontFamily"
            id="filled-required"
            variant="outlined"
            placeholder={t("description.ContactUsName")}
            type="text"
            value={FormName}
            onChange={handleChangeName}
            sx={{
              marginBottom: "1rem",
              backgroundColor: "#F9F9F9",
              textAlign: i18n.dir() === "ltr" ? "left" : "right",
              boxShadow: "0px 8.31034px 21.3695px rgba(134, 136, 239, 0.37)",
              borderRadius: "18px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "18px",
              },
            }}
          />
          <TextField
            className="palceholderFontFamily"
            id="outlined-name"
            variant="outlined"
            placeholder={t("description.ContactUsEmail")}
            type="email"
            value={FormEmail}
            onChange={handleChangeEmail}
            sx={{
              backgroundColor: "#F9F9F9",
              boxShadow: "0px 8.31034px 21.3695px rgba(134, 136, 239, 0.37)",
              borderRadius: "18px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "18px",
              },
            }}
          />
          <TextField
            id="outlined-textarea"
            className="palceholderFontFamily"
            placeholder={t("description.ContactUsYourMessage")}
            multiline
            variant="outlined"
            rows={8}
            sx={{
              marginTop: "1rem",
              backgroundColor: "#F9F9F9",
              boxShadow: "0px 8.31034px 21.3695px rgba(134, 136, 239, 0.37)",
              borderRadius: "18px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "18px",
              },
            }}
            value={FormMessage}
            onChange={handleChangeMessage}
          />
          <Box
            sx={{
              flexGrow: 0,
              textAlign: "center",
            }}
          >
            <Chip
              label={t("description.ContactUsSend")}
              color="warning"
              sx={{
                marginTop: "3rem",
                padding: "20px 15px",
                background:
                  "linear-gradient(98.53deg, #F5958D 10.06%, #EC978F 94.04%)",
                color: "#FFFEFD",
                fontSize: "18px",
                boxShadow: " 0px 8.31034px 21.3695px rgba(245, 149, 141, 0.24)",
              }}
              onClick={handleSubmitContactUs}
            />
          </Box>
        </FormControl>
        <Box
          sx={{
            gridColumnStart: "8",
            gridColumnEnd: "12",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
          }}
          className="contactUsIconsMobile"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "3rem",
            }}
            className="contactUsPhoneMobileMargin"
          >
            <img src={phone} alt="phone Icon" />
            <Typography sx={{ margin: "0 1rem" }}>
              {t("description.Phone")}
              <span>
                : {i18n.dir() === "ltr" ? "+ 97440011870" : "97440011870 +"}{" "}
              </span>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "3rem",
            }}
            className="contactUsEmailMobileMargin"
          >
            <img src={mail} alt="mail Icon" />
            <Typography sx={{ margin: "0 1rem" }}>
              {t("description.EMail")} : info@flowerpot.qa
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={location} alt="location Icon" />
            <Typography sx={{ margin: "0 1rem" }}>
              {t("description.location")}: {t("description.contactLocation")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUs;
