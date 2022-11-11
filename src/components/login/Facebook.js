import React from "react";
import { FaFacebook } from "react-icons/fa";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { socialLogin } from "../dashboard/constants/urls";
import Swal from "sweetalert2";

const Facebook = ({ setOpen }) => {
  const { t, i18n } = useTranslation();
  const responseFacebook = (response) => {
    const data = {
      access_token: response.accessToken,
      social_type: "facebook",
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
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });

    setOpen(false);
  };

  return (
    <FacebookLogin
      appId="797473674552791"
      callback={responseFacebook}
      render={(renderProps) => (
        <IconButton
          className="SocialIconButtonMobileContainer"
          sx={{
            border: "1px solid #dadce0",
            padding: "0 8px",
            borderRadius: "5.655px",
            height: "41.5px",
            "&:hover": {
              background: "none",
            },
          }}
          onClick={renderProps.onClick}
        >
          <FaFacebook fill="#176dd9" />
          <span style={{ fontSize: "0.8rem", width: "100%" }}>
            {t("description.SigninwithFacebook")}
          </span>
        </IconButton>
      )}
    />
  );
};

export default Facebook;
