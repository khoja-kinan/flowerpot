import { GoogleLogin } from "react-google-login";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { socialLogin } from "../dashboard/constants/urls";
import Swal from "sweetalert2";

const GoogleLoginComponent = ({ setOpen }) => {
  const { t, i18n } = useTranslation();

  const responseGoogle = (response) => {
    const data = {
      access_token: response.tokenId,
      social_type: "google",
    };
    axios
      .post(socialLogin, data, {
        headers: {
          "X-localization": i18n.language,
        },
      })
      .then((response) => {
        localStorage.setItem("FlowerPotUsername", response.data.data.user.name);
        localStorage.setItem(
          "FlowerPotUserEmail",
          response.data.data.user.email
        );
        localStorage.setItem("FlowerPotUserID", response.data.data.user.id);
        localStorage.setItem(
          "FlowerPotAuthorisation",
          response.data.data.authorisation.token
        );
        setOpen(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 500,
        });

        window.location.reload();
      })
      .catch((error) => {
        setOpen(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };

  return (
    <GoogleLogin
      clientId="998333113292-30m8fqf3db7fhm1e207hr1fmv8v893u8.apps.googleusercontent.com"
      render={(renderProps) => (
        <IconButton
          sx={{
            "&:hover": {
              background: "none",
            },
            border: "1.33188px solid #F0F0F0",
            borderRadius: "10.655px",
          }}
          className="SocialIconButtonMobileContainer"
          onClick={renderProps.onClick}
        >
          <FcGoogle />
          <span style={{ fontSize: "0.8rem", margin: "0 0.5rem" }}>
            {" "}
            {t("description.SigninwithGoogle")}
          </span>
        </IconButton>
      )}
      autoLoad={false}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginComponent;
