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
import { FaFacebook } from "react-icons/fa";
import { Box, IconButton, Typography } from "@mui/material";
import Swal from "sweetalert2";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

const SignUpDialog = () => {
  const { t } = useTranslation();
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [stateSignUp, setStateSignUp] = React.useState();
  const [signUpValues, setSignupValues] = React.useState({
    name: "",
    password: "",
    email: "",
    showPassword: false,
  });
  const handleChangeSignUp = (prop) => (event) => {
    setSignupValues({ ...signUpValues, [prop]: event.target.value });
  };

  const handleClickShowPasswordSignUp = () => {
    setSignupValues({
      ...signUpValues,
      showPassword: !signUpValues.showPassword,
    });
  };
  const handleMouseDownPasswordSignUp = (event) => {
    event.preventDefault();
  };
  const handleClickOpenSignUp = () => {
    setOpenSignUp(true);
  };

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };
  const handleSignUp = () => {
    const data = {
      name: signUpValues.name,
      email: signUpValues.email,
      password: signUpValues.password,
    };
    axios
      .post("example.com", data)
      .then((response) => {
        setStateSignUp({ message: response.data.message });
        /* Swal.fire({
          position: "center",
          icon: "success",
          title: stateSignUp.message,
          showConfirmButton: false,
          timer: 1500,
        }); */
        /* window.location.reload(); */
      })
      .catch((error) => {
        setStateSignUp({ errorMessage: error.message });
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
      });
    setOpenSignUp(false);
  };
  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpenSignUp}
        sx={{
          display: "inline-block",
          color: "#F5958D",
          height: "2.5vw",
          fontSize: "1rem",
          border: "none",
          borderRadius: "50px",
          "&:hover": { color: "#F5958D", border: "none" },
        }}
      >
        {t("description.SignUp")}
      </Button>
      <Dialog open={openSignUp} onClose={handleCloseSignUp}>
        <DialogContent
          sx={{
            background: `url(${BGPic})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            display: "grid",
            gridTemplateColumns: "repeat(12,1fr)",
            gridTemplateRows: "1fr 2rem 2rem 3rem 5rem 5rem 4rem 3rem 3rem",
            rowGap: "1rem",
          }}
        >
          <DialogContentText sx={{ gridColumnStart: "2", gridColumnEnd: "8" }}>
            <img src={Logo} alt={Logo} style={{ width: "70%" }} />
          </DialogContentText>
          <Typography
            sx={{
              gridRowStart: "2",
              gridColumnStart: "2",
              gridColumnEnd: "8",
              color: "#555555",
            }}
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
          >
            <IconButton
              sx={{
                "&:hover": {
                  background: "none",
                },
                border: "1.33188px solid #F0F0F0",
                borderRadius: "10.655px",
              }}
            >
              <FcGoogle />
              <span style={{ fontSize: "0.8rem", margin: "0 0.5rem" }}>
                {" "}
                {t("description.SignupwithGoogle")}
              </span>
            </IconButton>
            <IconButton
              sx={{
                border: "1.33188px solid #F0F0F0",
                borderRadius: "10.655px",

                "&:hover": {
                  background: "none",
                },
              }}
            >
              <FaFacebook fill="#176dd9" />
              <span style={{ fontSize: "0.8rem", margin: "0 0.5rem" }}>
                {" "}
                {t("description.SignupwithFacebook")}
              </span>
            </IconButton>
          </Box>
          <TextField
            sx={{
              gridRowStart: "5",
              gridColumnStart: "2",
              gridColumnEnd: "12",
            }}
            autoFocus
            margin="dense"
            id="email"
            label={t("description.NewUserDialogEmail")}
            type="email"
            fullWidth
            variant="outlined"
            onChange={handleChangeSignUp("email")}
          />
          <TextField
            sx={{
              gridRowStart: "6",
              gridColumnStart: "2",
              gridColumnEnd: "12",
            }}
            autoFocus
            margin="dense"
            id="name"
            label={t("description.NewUserDialogUsername")}
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChangeSignUp("name")}
          />
          <FormControl
            sx={{
              width: "100%",
              gridRowStart: "7",
              gridColumnStart: "2",
              gridColumnEnd: "12",
              direction: "ltr",
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              {t("description.NewUserDialogPassword")}
            </InputLabel>
            <OutlinedInput
              sx={{ width: "100%" }}
              id="outlined-adornment-password"
              type={signUpValues.showPassword ? "text" : "password"}
              value={signUpValues.password}
              onChange={handleChangeSignUp("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordSignUp}
                    onMouseDown={handleMouseDownPasswordSignUp}
                    edge="end"
                  >
                    {signUpValues.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Box
            sx={{
              gridRowStart: "8",
              gridColumnStart: "2",
              gridColumnEnd: "12",
              justifySelf: "center",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                color: "white",
                backgroundColor: "#F5958D",
                padding: "10px 10px",
                width: "10vw",
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
              onClick={handleSignUp}
            >
              {t("description.SignUp")}
            </Button>
          </Box>
          <Box
            sx={{
              gridRowStart: "9",
              gridColumnStart: "2",
              gridColumnEnd: "12",
              justifySelf: "center",
            }}
          >
            <Typography style={{ color: "#686868" }}>
              {t("description.HaveanAccount")}
              <span
                onClick={handleCloseSignUp}
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignUpDialog;
