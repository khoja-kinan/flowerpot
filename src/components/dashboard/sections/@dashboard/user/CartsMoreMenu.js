import { useRef, useState } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
// component
import Iconify from "../../../components/Iconify";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { getCartPaymentStatusUrl, getCartsUrl } from "../../../constants/urls";
import Logo from "../../../../../assets/flowersLogo.png";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

export default function CartsMoreMenu({ id, token, item }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openDeny, setOpenDeny] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openPaymentStatus, setOpenPaymentStatus] = useState(false);

  const [state, setState] = useState("");
  const { t, i18n } = useTranslation();

  /* Approve */
  const handleClickOpenApprove = () => {
    setOpenApprove(true);
  };

  const handleCloseApprove = () => {
    setOpenApprove(false);
    setIsOpen(false);
  };

  const handleApproveRequest = () => {
    const data = {
      status: "delivered",
    };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${getCartsUrl}/update/${id}`, data, { headers })
      .then((response) => {
        setState({ message: response.data.message });
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    setOpenApprove(false);
  };

  /* Deny */
  const handleClickOpenDeny = () => {
    setOpenDeny(true);
  };

  const handleCloseDeny = () => {
    setOpenDeny(false);
    setIsOpen(false);
  };

  const handleDenyRequest = () => {
    const data = {
      status: "rejected",
    };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    };
    axios
      .post(`${getCartsUrl}/update/${id}`, data, { headers })
      .then((response) => {
        setState({ message: response.data.message });
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    setOpenDeny(false);
  };
  /* Show Details */

  const handleClickOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleClickCloseDetails = () => {
    setOpenDetails(false);
    setIsOpen(false);
  };

  const handleDetailsPrint = () => {
    window.print();
  };
  /* Show payment status */
  const [cartPayment, setCartPayment] = useState();
  const [paymentStatusLoading, setPaymentStatusLoading] = useState(false);

  const handleClickOpenPaymentStatus = async () => {
    setPaymentStatusLoading(true);
    await axios
      .get(`${getCartPaymentStatusUrl}${item.id}`, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setPaymentStatusLoading(false);
        if (response.status === 200) {
          setOpenPaymentStatus(true);
          setCartPayment(response.data.data);
        }
      })
      .catch((error) => {
        setPaymentStatusLoading(false);

        console.log(error.response);
      });
  };

  const handleClickClosePaymentStatus = () => {
    setOpenPaymentStatus(false);
    setIsOpen(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpenApprove}
        >
          <ListItemIcon>
            <Iconify icon="flat-color-icons:approval" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={t("Dashboard.approveOrder")}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpenDeny}
        >
          <ListItemIcon>
            <Iconify icon="flat-color-icons:cancel" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={t("Dashboard.denyOrder")}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpenDetails}
        >
          <ListItemIcon>
            <Iconify icon="bx:show" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={t("Dashboard.showOrder")}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        {item.payment_method === "OnlinePayment" && (
          <LoadingButton
            loading={paymentStatusLoading}
            sx={{ color: "text.secondary", width: "100%", display: "flex" }}
            onClick={handleClickOpenPaymentStatus}
          >
            <ListItemIcon>
              <Iconify icon="bx:show" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary={t("Dashboard.showPaymentStatus")}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </LoadingButton>
        )}
      </Menu>
      {/* approve Dialog */}
      <Dialog
        open={openApprove}
        onClose={handleCloseApprove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("Dashboard.cartRequestApproveTitle")}
        </DialogTitle>
        <DialogContent id="alert-dialog-description">
          {t("Dashboard.cartRequestApprove")}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseApprove} sx={{ color: "red" }}>
            {" "}
            {t("description.Cancel")}
          </Button>
          <Button
            onClick={handleApproveRequest}
            autoFocus
            sx={{ color: "green" }}
          >
            {t("description.Ok")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* deny Dialog */}
      <Dialog
        open={openDeny}
        onClose={handleCloseDeny}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("Dashboard.cartRequestDenyTitle")}
        </DialogTitle>
        <DialogContent id="alert-dialog-description">
          {t("Dashboard.cartRequestDeny")}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeny} sx={{ color: "red" }}>
            {t("description.Cancel")}
          </Button>
          <Button onClick={handleDenyRequest} autoFocus sx={{ color: "green" }}>
            {t("description.Ok")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Details Dialog */}
      <Dialog
        fullWidth
        open={openDetails}
        onClose={handleClickCloseDetails}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <Typography sx={{ fontWeight: "800", fontSize: "1.2rem" }}>
              {t("Dashboard.flowerStore")}
            </Typography>
            <img src={Logo} alt={"logo"} width={"20%"} className="headerLogo" />
          </Box>
        </DialogTitle>
        <DialogContent id="alert-dialog-description">
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align={i18n.dir() === "ltr" ? "left" : "right"}>
                    {t("Dashboard.buyerName")}
                  </TableCell>
                  <TableCell align={i18n.dir() === "ltr" ? "right" : "left"}>
                    {item.user.name}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align={i18n.dir() === "ltr" ? "left" : "right"}
                  >
                    {t("Dashboard.FlowerPageTabelHeadArName")}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align={i18n.dir() === "ltr" ? "right" : "left"}
                  >
                    {i18n.dir() === "ltr"
                      ? item.flower.nameEN
                      : item.flower.nameAR}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align={i18n.dir() === "ltr" ? "left" : "right"}
                  >
                    {t("Dashboard.amount")}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align={i18n.dir() === "ltr" ? "right" : "left"}
                  >
                    {item.amount}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align={i18n.dir() === "ltr" ? "left" : "right"}
                  >
                    {t("Dashboard.totalPrice")}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align={i18n.dir() === "ltr" ? "right" : "left"}
                  >
                    {item.total_price}
                    {"  "} {t("description.QAR")}
                  </TableCell>
                </TableRow>
                {item.flower.offer === "0" ? (
                  ""
                ) : item.flower.offer === null ? (
                  ""
                ) : (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align={i18n.dir() === "ltr" ? "left" : "right"}
                    >
                      {t("Dashboard.discount")}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align={i18n.dir() === "ltr" ? "right" : "left"}
                    >
                      {item.flower.offer}
                      {"  "} %
                    </TableCell>
                  </TableRow>
                )}
                {item.delivery_location === null ? (
                  ""
                ) : (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align={i18n.dir() === "ltr" ? "left" : "right"}
                    >
                      {t("description.DeliveryLocation")}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align={i18n.dir() === "ltr" ? "right" : "left"}
                    >
                      {item.delivery_location}
                    </TableCell>
                  </TableRow>
                )}

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align={i18n.dir() === "ltr" ? "left" : "right"}
                  >
                    {t("description.DeliveryDateCart")}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align={i18n.dir() === "ltr" ? "right" : "left"}
                  >
                    {item.delivery_date}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align={i18n.dir() === "ltr" ? "left" : "right"}
                  >
                    {t("description.DeliveryTime")}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align={i18n.dir() === "ltr" ? "right" : "left"}
                  >
                    {item.delivery_time}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align={i18n.dir() === "ltr" ? "left" : "right"}
                  >
                    {t("description.DeliveryType")}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align={i18n.dir() === "ltr" ? "right" : "left"}
                  >
                    {item.delivery_type === "PickUp"
                      ? i18n.dir() === "ltr"
                        ? "Pick Up"
                        : "استلام باليد"
                      : i18n.dir() === "ltr"
                      ? "Delivery"
                      : "توصيل"}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align={i18n.dir() === "ltr" ? "left" : "right"}
                  >
                    {t("description.PaymentMethod")}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align={i18n.dir() === "ltr" ? "right" : "left"}
                  >
                    {item.payment_method === "CASH"
                      ? i18n.dir() === "ltr"
                        ? "Cash"
                        : "نقدأ"
                      : i18n.dir() === "ltr"
                      ? "Online Payment"
                      : "دفع ألكتروني"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions id="printPageButton">
          <Button onClick={handleClickCloseDetails}>
            {t("Dashboard.Close")}
          </Button>
          <Button onClick={handleDetailsPrint} autoFocus>
            {t("Dashboard.print")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Payment Dialog */}
      {cartPayment !== undefined && (
        <Dialog
          fullScreen
          open={openPaymentStatus}
          onClose={handleClickClosePaymentStatus}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <Typography sx={{ fontWeight: "800", fontSize: "1.2rem" }}>
                {t("Dashboard.flowerStore")}
              </Typography>
              <img
                src={Logo}
                alt={"logo"}
                width={"10%"}
                className="headerLogo"
              />
            </Box>
          </DialogTitle>
          <DialogContent id="alert-dialog-description">
            <TableContainer component={Paper}>
              <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align={i18n.dir() === "ltr" ? "left" : "right"}>
                      {t("Dashboard.cartPaymentStatus")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                {cartPayment === null ? (
                  <Typography sx={{ margin: "1rem" }}>
                    {t("Dashboard.noPaymentAction")}
                  </Typography>
                ) : (
                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align={i18n.dir() === "ltr" ? "left" : "right"}
                      >
                        RESPCODE
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align={i18n.dir() === "ltr" ? "right" : "left"}
                      >
                        {cartPayment.RESPCODE}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align={i18n.dir() === "ltr" ? "left" : "right"}
                      >
                        RESPMSG
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align={i18n.dir() === "ltr" ? "right" : "left"}
                      >
                        {cartPayment.RESPMSG}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align={i18n.dir() === "ltr" ? "left" : "right"}
                      >
                        STATUS
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align={i18n.dir() === "ltr" ? "right" : "left"}
                      >
                        {cartPayment.STATUS}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align={i18n.dir() === "ltr" ? "left" : "right"}
                      >
                        TXNAMOUNT
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align={i18n.dir() === "ltr" ? "right" : "left"}
                      >
                        {cartPayment.TXNAMOUNT}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align={i18n.dir() === "ltr" ? "left" : "right"}
                      >
                        cart_id
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align={i18n.dir() === "ltr" ? "right" : "left"}
                      >
                        {cartPayment.cart_id}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align={i18n.dir() === "ltr" ? "left" : "right"}
                      >
                        checksumhash
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align={i18n.dir() === "ltr" ? "right" : "left"}
                      >
                        {cartPayment.checksumhash}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align={i18n.dir() === "ltr" ? "left" : "right"}
                      >
                        transaction_number
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align={i18n.dir() === "ltr" ? "right" : "left"}
                      >
                        {cartPayment.transaction_number}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align={i18n.dir() === "ltr" ? "left" : "right"}
                      >
                        transaction_status
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align={i18n.dir() === "ltr" ? "right" : "left"}
                      >
                        {cartPayment.transaction_status}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align={i18n.dir() === "ltr" ? "left" : "right"}
                      >
                        transaction_status
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align={i18n.dir() === "ltr" ? "right" : "left"}
                      >
                        {cartPayment.transaction_status}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions id="printPageButton">
            <Button onClick={handleClickClosePaymentStatus}>
              {t("Dashboard.Close")}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
