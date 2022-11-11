import axios from "axios";

export const RememberToketlogin = async (remember) => {
  let result = null;
  await axios
    .post(
      "example.com",
      { token: remember },
      { headers: { Accept: "application/json" } }
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
