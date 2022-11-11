import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useTranslation } from "react-i18next";
import BGPic from "./signInDialogBG.png";
import Logo from "../../assets/flowersLogo.png";
import { FcGoogle } from "react-icons/fc";
import { Box, IconButton, Typography } from "@mui/material";
import Swal from "sweetalert2";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { forgetPasswordUrl } from "../dashboard/constants/urls";
import Facebook from "../login/Facebook";
import GoogleLoginComponent from "../login/GoogleLoginComponent";
import GoogleLoginButton from "../login/GoogleLoginButton";
const SignInDialog = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  /* const [values, setValues] = React.useState({
    password: "",
    email: "",
    showPassword: false,
  }); */
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [showError, setShowError] = React.useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("Dashboard.loginFormValidEmail"))
      .required(t("Dashboard.loginFormRequiredEmail")),
    password: Yup.string().required(t("Dashboard.loginFormRequiredPass")),
  });
  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("Dashboard.loginFormValidEmail"))
      .required(t("Dashboard.loginFormRequiredEmail")),
    password: Yup.string().required(t("Dashboard.loginFormRequiredPass")),
    name: Yup.string().required(t("Dashboard.loginFormRequiredName")),
    number: Yup.string()
      .test(
        "len",
        t("Dashboard.loginFormRequirednumber"),
        (val) => val.length >= 8
      )
      .required("required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      handleSignIn();
    },
  });
  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignIn = () => {
    const data = {
      email: formik.values.email,
      password: formik.values.password,
    };
    axios
      .post("example.com", data, {
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
          "FlowerPotUserPhone",
          response.data.data.user.phone_number
        );
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

  /* sign up */
  const [openSignUp, setOpenSignUp] = React.useState(false);

  const handleClickOpenSignUp = () => {
    setOpenSignUp(true);
    setOpen(false);
  };

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };
  const handleCloseSignUpOpenSignIn = () => {
    setOpenSignUp(false);
    setOpen(true);
  };
  const formikSignUp = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      number: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: () => {
      handleSignUp();
    },
  });

  const handleSignUp = () => {
    const data = {
      name: formikSignUp.values.name,
      email: formikSignUp.values.email,
      password: formikSignUp.values.password,
      phone_number: formikSignUp.values.number,
    };
    axios
      .post("example.com", data, {
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
        localStorage.setItem(
          "FlowerPotUserPhone",
          response.data.data.user.phone_number
        );
        setOpenSignUp(false);
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
        setOpenSignUp(false);
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
  };

  /* forget Password */
  const handleResetPassword = () => {
    const data = { email: formik.values.email };
    const headers = {
      Accept: "application/json",
      "X-localization": i18n.language,
    };
    axios
      .post(forgetPasswordUrl, data, {
        headers,
      })
      .then((response) => {
        setOpen(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message,
          showConfirmButton: true,
        });
      })
      .catch((error) => {
        /*  setResetPasswordState(error.message); */
        console.log(error);
      });
  };
  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          color: "white",
          backgroundColor: "#F5958D",
          padding: "10px 10px",
          width: "12vw",
          fontWeight: "600",
          height: "2.5vw",
          fontSize: "0.8rem",
          border: "none",
          borderRadius: "50px",
          "&:hover": { color: "white", backgroundColor: "#F5958D" },
        }}
        className="signinbuttonMobile"
      >
        {t("description.EmployeeSignIn")}
      </Button>
      {/* SignIn dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "&.MuiPaper-root-MuiDialog-paper": { Maxheight: "100%" },
        }}
      >
        <DialogContent
          sx={{
            background: `url(${BGPic})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            display: "grid",
            gridTemplateColumns: "repeat(12,1fr)",
            gridTemplateRows: "1fr 2rem 3rem 3rem 5rem 4rem 3rem 3rem",
          }}
          className="signInDialogContentMobile"
        >
          <DialogContentText sx={{ gridColumnStart: "2", gridColumnEnd: "8" }}>
            <img src={Logo} alt={Logo} style={{ width: "60%" }} />
          </DialogContentText>
          <Typography
            sx={{
              gridRowStart: "2",
              gridColumnStart: "2",
              gridColumnEnd: "8",
              color: "#555555",
            }}
          >
            {t("description.dashboardAppWelcome")}
          </Typography>
          <Typography
            sx={{
              gridRowStart: "3",
              gridColumnStart: "2",
              gridColumnEnd: "10",
              color: "#FF867B",
              fontWeight: "600",
            }}
            className="socialSignIntText"
          >
            {t("description.SigninwithSocialMedia")}
          </Typography>
          <Box
            sx={{
              gridRowStart: "4",
              gridColumnStart: "2",
              gridColumnEnd: "12",
              color: "#FF867B",
              fontWeight: "600",
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              columnGap: "1rem",
            }}
            className="SocialIconButtonMobileContainerBox"
          >
            <GoogleLoginButton setOpen={setOpen} />
            <Facebook setOpen={setOpen} />
          </Box>
          <Box
            sx={{
              marginTop: "0.8rem",
              gridRowStart: "5",
              gridColumnStart: "2",
              gridColumnEnd: "12",
              direction: "ltr",
            }}
          >
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                {showError ? (
                  <div
                    style={{
                      color: "red",
                      border: "1px solid red",
                      padding: "10px",
                      borderRadius: "10px",
                      textAlign: "center",
                    }}
                  >
                    {error}
                  </div>
                ) : (
                  ""
                )}
                <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  placeholder={t("description.NewUserDialogEmail")}
                  type="email"
                  fullWidth
                  variant="outlined"
                  /* onChange={handleChange("email")} */
                  className="emailInputSigninMobile"
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
                    input: {
                      "&::placeholder": {
                        fontFamily: "Montserrat",
                        textAlign: i18n.dir() === "ltr" ? "left" : "right",
                      },
                    },
                  }}
                />
                <TextField
                  sx={{
                    marginTop: "0.5rem",
                    input: {
                      "&::placeholder": {
                        fontFamily: "Montserrat",
                        textAlign: i18n.dir() === "ltr" ? "left" : "right",
                      },
                    },
                  }}
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("description.NewUserDialogPassword")}
                  {...getFieldProps("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />

                <Box
                  sx={{
                    gridRowStart: "7",
                    gridColumnStart: "2",
                    gridColumnEnd: "12",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginTop: "0.5rem",
                  }}
                >
                  <Button
                    variant="outlined"
                    type="submit"
                    sx={{
                      color: "white",
                      backgroundColor: "#F5958D",
                      padding: "10px 10px",
                      width: "10vw",
                      border: "none",

                      height: "2.5vw",
                      fontSize: "1rem",
                      border: "none",
                      borderRadius: "50px",
                      "&:hover": {
                        color: "white",
                        backgroundColor: "#F5958D",
                        border: "none",
                      },
                    }}
                    className="signInButtonSigninDialogMobile"
                  >
                    {t("description.EmployeeSignIn")}
                  </Button>
                  <Button
                    variant="subtitle2"
                    sx={{
                      color: "#F5958D",
                      padding: "0",
                      "&:hover": {
                        color: "#F5958D",
                        background: "none",
                      },
                    }}
                    onClick={handleResetPassword}
                  >
                    {t("Dashboard.loginFormForgetPass")}
                  </Button>
                </Box>
              </Form>
            </FormikProvider>
            <Box
              sx={{
                gridRowStart: "8",
                gridColumnStart: "2",
                gridColumnEnd: "12",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                direction: i18n.dir() === "ltr" ? "ltr" : "rtl",
                alignSelf: "center",
              }}
            >
              <span style={{ color: "#686868" }}>
                {t("description.dontHaveanAccount")}
              </span>
              <Button
                variant="outlined"
                onClick={handleClickOpenSignUp}
                sx={{
                  display: "inline-block",
                  color: "#F5958D",
                  height: "2.5vw",
                  fontSize: "1rem",
                  border: "none",
                  padding: "0 15px",
                  borderRadius: "50px",
                  "&:hover": { color: "#F5958D", border: "none" },
                }}
                className="signUpSignIndialogMobile"
              >
                {t("description.SignUp")}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      {/* signUp Dialog */}
      <Dialog open={openSignUp} onClose={handleCloseSignUp}>
        <DialogContent
          sx={{
            background: `url(${BGPic})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            display: "grid",
            gridTemplateColumns: "repeat(12,1fr)",
            gridTemplateRows: "1fr 2rem 2rem 3rem 4rem 4.5rem 4rem 2.5rem 2rem",
          }}
          className="signInDialogContentMobile"
        >
          <DialogContentText sx={{ gridColumnStart: "2", gridColumnEnd: "8" }}>
            <img src={Logo} alt={Logo} style={{ width: "50%" }} />
          </DialogContentText>
          <Typography
            sx={{
              gridRowStart: "2",
              gridColumnStart: "2",
              gridColumnEnd: "8",
              color: "#555555",
            }}
            className="colorFullExperienceMobile"
          >
            {t("description.ColorfulExperience")}
          </Typography>
          <Typography
            sx={{
              gridRowStart: "3",
              gridColumnStart: "2",
              gridColumnEnd: "9",
              color: "#FF867B",
              fontWeight: "600",
            }}
            className="colorFullExperienceMobile"
          >
            {t("description.SignupwithSocialMedia")}
          </Typography>
          <Box
            sx={{
              gridRowStart: "4",
              gridColumnStart: "2",
              gridColumnEnd: "12",
              color: "#FF867B",
              fontWeight: "600",
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              columnGap: "2rem",
            }}
            className="SocialIconButtonMobileContainerBox"
          >
            <GoogleLoginButton setOpen={setOpen} />
            <Facebook setOpen={setOpen} />
          </Box>
          <Box
            sx={{
              gridRowStart: "5",
              gridColumnStart: "2",
              gridColumnEnd: "12",
              direction: "ltr",
            }}
          >
            <FormikProvider value={formikSignUp}>
              <Form
                autoComplete="off"
                noValidate
                onSubmit={formikSignUp.handleSubmit}
              >
                {showError ? (
                  <div
                    style={{
                      color: "red",
                      border: "1px solid red",
                      padding: "10px",
                      borderRadius: "10px",
                      textAlign: "center",
                    }}
                  >
                    {error}
                  </div>
                ) : (
                  ""
                )}

                <TextField
                  sx={{
                    gridRowStart: "5",
                    gridColumnStart: "2",
                    gridColumnEnd: "12",
                    input: {
                      "&::placeholder": {
                        fontFamily: "Montserrat",
                        textAlign: i18n.dir() === "ltr" ? "left" : "right",
                      },
                    },
                  }}
                  autoFocus
                  margin="dense"
                  id="email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  {...formikSignUp.getFieldProps("email")}
                  error={Boolean(
                    formikSignUp.touched.email && formikSignUp.errors.email
                  )}
                  helperText={
                    formikSignUp.touched.email && formikSignUp.errors.email
                  }
                  placeholder={t("description.NewUserDialogEmail")}
                />
                <TextField
                  sx={{
                    gridRowStart: "6",
                    gridColumnStart: "2",
                    gridColumnEnd: "12",
                    input: {
                      "&::placeholder": {
                        fontFamily: "Montserrat",
                        textAlign: i18n.dir() === "ltr" ? "left" : "right",
                      },
                    },
                  }}
                  margin="dense"
                  id="name"
                  placeholder={t("description.NewUserDialogUsername")}
                  type="text"
                  fullWidth
                  {...formikSignUp.getFieldProps("name")}
                  variant="outlined"
                  error={Boolean(
                    formikSignUp.touched.name && formikSignUp.errors.name
                  )}
                  helperText={
                    formikSignUp.touched.name && formikSignUp.errors.name
                  }
                />
                <TextField
                  sx={{
                    gridRowStart: "6",
                    gridColumnStart: "2",
                    gridColumnEnd: "12",
                    input: {
                      "&::placeholder": {
                        fontFamily: "Montserrat",
                        textAlign: i18n.dir() === "ltr" ? "left" : "right",
                      },
                    },
                  }}
                  margin="dense"
                  id="number"
                  placeholder={t("description.NewUserDialogphoneNumber")}
                  type="number"
                  fullWidth
                  {...formikSignUp.getFieldProps("number")}
                  variant="outlined"
                  error={Boolean(
                    formikSignUp.touched.number && formikSignUp.errors.number
                  )}
                  helperText={
                    formikSignUp.touched.number && formikSignUp.errors.number
                  }
                />
                <TextField
                  sx={{
                    marginTop: "0.5rem",
                    input: {
                      "&::placeholder": {
                        fontFamily: "Montserrat",
                        textAlign: i18n.dir() === "ltr" ? "left" : "right",
                      },
                    },
                  }}
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("description.NewUserDialogPassword")}
                  {...formikSignUp.getFieldProps("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(
                    formikSignUp.touched.password &&
                      formikSignUp.errors.password
                  )}
                  helperText={
                    formikSignUp.touched.password &&
                    formikSignUp.errors.password
                  }
                />
                <Box
                  sx={{
                    gridRowStart: "8",
                    gridColumnStart: "2",
                    gridColumnEnd: "12",
                    textAlign: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    type="submit"
                    sx={{
                      color: "white",
                      backgroundColor: "#F5958D",
                      padding: "10px 10px",
                      width: "10vw",
                      height: "2.5vw",
                      fontSize: "1rem",
                      border: "none",
                      margin: "0.5rem auto 0 auto",
                      borderRadius: "50px",
                      "&:hover": {
                        color: "white",
                        backgroundColor: "#F5958D",
                        border: "none",
                      },
                    }}
                    className="signInButtonSigninDialogMobile"
                  >
                    {t("description.SignUp")}
                  </Button>
                </Box>
              </Form>
            </FormikProvider>
            <Box sx={{ textAlign: "center", margin: "0.5rem 0 " }}>
              <Typography
                style={{ color: "#686868" }}
                className="haveAccountTextSize"
              >
                {t("description.HaveanAccount")}
                <span
                  onClick={handleCloseSignUpOpenSignIn}
                  style={{
                    cursor: "pointer",
                    color: "#F5958D",
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  {t("description.EmployeeSignIn")}
                </span>
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignInDialog;
