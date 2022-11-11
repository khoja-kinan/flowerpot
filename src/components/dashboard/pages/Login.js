/* import { Link as RouterLink } from 'react-router-dom'; */
// material
import { styled } from "@mui/material/styles";
import { Card, Stack, Container, Typography } from "@mui/material";
// layouts

import Page from "../components/Page";
import { LoginForm } from "../sections/authentication/login";
import { useTranslation } from "react-i18next";
import LanguagePopover from "../../LanguagePopover";
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { t } = useTranslation();

  return (
    <RootStyle title="Login | Flower Pot">
      <SectionStyle sx={{ display: { xs: "none", md: "flex" } }}>
        <img src="/static/illustrations/logo.png" alt="login" />
      </SectionStyle>
      <LanguagePopover />

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h3" gutterBottom sx={{ color: "#3a6c90" }}>
              {t("Dashboard.signInTitle")}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {t("Dashboard.signInInstructions")}
            </Typography>
          </Stack>

          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
