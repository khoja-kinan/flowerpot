import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { socialLogin } from "../dashboard/constants/urls";
import Swal from "sweetalert2";

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });

const GoogleLoginButton = ({ setOpen }) => {
  const googleButton = useRef(null);

  const { t, i18n } = useTranslation();

  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    const data = {
      access_token: response.credential,
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
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  }
  useEffect(() => {
    const src = "https://accounts.google.com/gsi/client";
    const id =
      "998333113292-30m8fqf3db7fhm1e207hr1fmv8v893u8.apps.googleusercontent.com";

    loadScript(src)
      .then(() => {
        /*global google*/
        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(googleButton.current, {
          theme: "outline",
          size: "large",
        });
      })
      .catch(console.error);

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`);
      if (scriptTag) document.body.removeChild(scriptTag);
    };
  }, []);

  return <div ref={googleButton}></div>;
};

export default GoogleLoginButton;
