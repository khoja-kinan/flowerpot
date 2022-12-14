import axios from "axios";
import { loginUrl } from "../constants/urls";
export const login = async (email, password, lang) => {
  let result = null;
  await axios
    .post(
      loginUrl,
      { email, password },
      {
        headers: {
          Accept: "application/json",
          "X-localization": lang,
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        result = response.data;
      }
    })
    .catch((error) => {
      /* console.log(error.response); */
      result = error.response;
    });
  return result;
};
