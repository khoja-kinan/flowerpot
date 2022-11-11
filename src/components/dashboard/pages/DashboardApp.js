// material
import {
  Box,
  Grid,
  Container,
  Typography,
  LinearProgress,
} from "@mui/material";
// components
import Page from "../components/Page";
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
} from "../sections/@dashboard/app";
import { useTranslation } from "react-i18next";
import { getDashboardCount } from "../constants/urls";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const { t } = useTranslation();
  const token = localStorage.getItem("FAT");
  let navigate = useNavigate();

  const [CountsList, setCountsList] = useState();

  useEffect(() => {
    function fecthData() {
      if (token == null) {
        navigate("/");
      } else {
        axios
          .get(getDashboardCount, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              setCountsList(response.data.data);
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }
    fecthData();
  }, [navigate]);
  return CountsList === undefined ? (
    <LinearProgress />
  ) : (
    <Page title="Dashboard | Flower Pot">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">
            {t("Dashboard.dashboardAppWelcome")}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales totalSales={CountsList.income} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers totalUsers={CountsList.users} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders orders={CountsList.delivered} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports flowers={CountsList.flowers} />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
