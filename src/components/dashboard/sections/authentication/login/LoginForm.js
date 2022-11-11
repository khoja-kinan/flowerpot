import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
// component
import Iconify from "../../../components/Iconify";
// login function
import { login } from "../../../controller/AuthController";
//
import useAuth from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

export default function LoginForm() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  let lang = i18n.language;

  const loginUser = async () => {
    const result = await login(
      formik.values.email,
      formik.values.password,
      lang
    );
    if (result != null && result.status === "success") {
      const username = result.data.user.name;
      const con = result.data.user.is_admin;
      setAuth(username, con);
      localStorage.setItem("Fusername", result.data.user.name);
      localStorage.setItem("@@123@@", result.data.user.is_admin);
      localStorage.setItem("FAT", result.data.authorisation.token);
      localStorage.setItem("Femail", result.data.user.email);
      navigate("/dashboard/app", { replace: true });
    } else {
      setError(result.data.message);
      setShowError(true);
      formik.setSubmitting(false);
    }
  };
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("Dashboard.loginFormValidEmail"))
      .required(t("Dashboard.loginFormRequiredEmail")),
    password: Yup.string().required(t("Dashboard.loginFormRequiredPass")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      loginUser();
    },
  });
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ outlineColor: "#495676" }}>
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
            fullWidth
            autoComplete="username"
            type="email"
            label={t("Dashboard.loginFormEmail")}
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            sx={{
              "& .MuiFormHelperText-root": {
                textAlign: i18n.dir() === "ltr" ? "left" : "right",
              },
            }}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label={t("Dashboard.loginFormPass")}
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            sx={{
              "& .MuiFormHelperText-root": {
                textAlign: i18n.dir() === "ltr" ? "left" : "right",
              },
              "& .MuiOutlinedInput-root": {
                flexDirection: i18n.dir() === "ltr" ? "row" : "row-reverse",
              },
            }}
          />
        </Stack>

        {/* <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Button
            variant="subtitle2"
            sx={{
              color: "#3a6c90",
              padding: "0",
              "&:hover": {
                color: "#3a6c90",
                background: "none",
              },
            }}
            onClick={handleResetPassword}
          >
            {t("Dashboard.loginFormForgetPass")}
          </Button>
        </Stack> */}

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          style={{
            background:
              "linear-gradient(88.21deg,#f6958d -25.83%,#f6958d 96.08%)",
            marginTop: "2rem",
          }}
        >
          {t("Dashboard.loginFormLoginButton")}
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
