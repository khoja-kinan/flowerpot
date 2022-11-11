import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AlertDialogCart from "../../assets/mayLike/alertDialogCart.png";
import { Alert, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Swal from "sweetalert2";
import Snackbar from "@mui/material/Snackbar";
import PhoneAlertDialog from "../../pages/PhoneAlertDialog";

const AlertDialog = ({
  nameAr,
  nameEn,
  flowerId,
  amount,
  deliveryType,
  dateAndTime,
  deliveryLocation,
  specialMesssage,
  note,
  payment,
  setOpenAddDialog,
  totalPrice,
}) => {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState("");
  const [cartId, setCartId] = React.useState("");
  const userEmail = localStorage.getItem("FlowerPotUserEmail");
  const userId = localStorage.getItem("FlowerPotUserID");
  const userPhone = localStorage.getItem("FlowerPotUserPhone");
  const { t, i18n } = useTranslation();
  const handleClickOpen = () => {
    const data = {
      flower_id: flowerId.toString(),
      amount: amount,
      delivery_type: deliveryType ? "delivery" : "PickUp",
      delivery_info: dateAndTime,
      delivery_location: deliveryLocation,
      special_message: specialMesssage,
      note: note,
      payment_method: payment,
      total_price: totalPrice,
    };
    if (data.delivery_info.length === 0) {
      setOpenDateSnack(true);
    } else if (
      data.delivery_type === "delivery" &&
      data.delivery_location === undefined
    ) {
      setOpenDeliverySnack(true);
    } else if (data.payment_method.length === 0) {
      setOpenPaymentSnack(true);
    } else {
      axios
        .post("example.com", data, {
          headers: {
            "X-localization": i18n.language,
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("FlowerPotAuthorisation"),
          },
        })
        .then((response) => {
          setCartId(response.data.data.id);
          setState(response.data.message);
          setOpen(true);
        })
        .catch((error) => {
          setOpenAddDialog(false);
          Swal.fire({
            icon: "error",
            text: error.response.data.message,
            confirmButtonColor: "#f5958d",
          });
          setState(error);
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenAddDialog(false);
  };
  /* Date SnackBar */

  const [openDateSnack, setOpenDateSnack] = React.useState(false);
  const handleCloseDateSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenDateSnack(false);
  };

  /* Location SnackBar */

  const [openDeliverySnack, setOpenDeliverySnack] = React.useState(false);
  const handleCloseDeliverySnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenDeliverySnack(false);
  };
  /* Payment SnackBar */

  const [openPaymentSnack, setOpenPaymentSnack] = React.useState(false);
  const handleClosePaymentSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenPaymentSnack(false);
  };
  return (
    <div>
      <Snackbar
        open={openDateSnack}
        autoHideDuration={6000}
        onClose={handleCloseDateSnack}
      >
        <Alert severity="error">
          {i18n.dir() === "ltr"
            ? "Please Add date and time to your order"
            : "يرجى اختيار الوقت والتاريخ للمتابعة"}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openDeliverySnack}
        autoHideDuration={6000}
        onClose={handleCloseDeliverySnack}
      >
        <Alert severity="error">
          {i18n.dir() === "ltr"
            ? "Please Enter Order Location"
            : "يرجى إدخال مكان التوصيل"}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openPaymentSnack}
        autoHideDuration={6000}
        onClose={handleClosePaymentSnack}
      >
        <Alert severity="error">
          {i18n.dir() === "ltr"
            ? "Please Enter Payment Method"
            : "يرجى اختيار طريقة الدفع"}
        </Alert>
      </Snackbar>
      <Button
        onClick={handleClickOpen}
        sx={{
          color: "#ffffff",
          background: "#F5958D",
          borderRadius: "50px",
          padding: "0.8rem 1rem",
          "&:hover": { color: "#ffffff", background: "#F5958D" },
        }}
        endIcon={
          <ShoppingCartIcon
            sx={{
              marginRight: i18n.dir() === "ltr" ? " " : "1rem",
              marginLeft: i18n.dir() === "ltr" ? "0.5rem" : " ",
            }}
          />
        }
      >
        {t("description.AddToCart")}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Stack justifyContent="center" sx={{ padding: "1rem" }}>
          <img src={AlertDialogCart} style={{ margin: "0 auto" }} />
        </Stack>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "#3A6A8F", fontWeight: "500" }}
            className="ProceedToCheckoutTextMobile"
          >
            <span style={{ fontWeight: "700" }}>
              {i18n.dir() === "ltr" ? nameEn : nameAr}
            </span>{" "}
            {i18n.dir() === "ltr"
              ? "has been added successfully to the cart , click 'Proceed to checkout' to continue your Order .. Or you can continue Order confirmation later"
              : "تمت إضافتها بنجاح إلى سلة المشتريات ، انقر فوق 'متابعة الدفع' لمتابعة طلبك .. أو يمكنك متابعة تأكيد الطلب في وقت لاحق"}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ alignItems: "center", justifyContent: "space-between" }}
          className="alertDialogCartActionsMobile"
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ShoppingCartIcon style={{ color: "#F5958D" }} />
            <Link to="/cart" style={{ color: "#F5958D" }}>
              {t("description.GoToCart")}
            </Link>
          </Box>
          <Box
            className="alertDialogCartActionsMobileButtonsBox"
            sx={{ display: "flex" }}
          >
            <Button onClick={handleClose}>{t("description.Close")} </Button>
            {payment === "OnlinePayment" ? (
              <form
                action="https://sadadqa.com/webpurchase"
                method="post"
                id="sadad_payment_form"
                name="gosadad"
              >
                <input
                  type="hidden"
                  name="merchant_id"
                  id="merchant_id"
                  value="merchant_id"
                />
                <input
                  type="hidden"
                  name="ORDER_ID"
                  id="ORDER_ID"
                  value={cartId}
                />

                <input
                  type="hidden"
                  name="WEBSITE"
                  id="WEBSITE"
                  value="example.com"
                />
                <input
                  type="hidden"
                  name="TXN_AMOUNT"
                  id="TXN_AMOUNT"
                  value={totalPrice}
                />

                {/* <input type="hidden" name="CUST_ID" id="CUST_ID" value={userId} /> */}
                <input
                  type="hidden"
                  name="EMAIL"
                  id="EMAIL"
                  value={userEmail}
                />

                <input
                  type="hidden"
                  name="MOBILE_NO"
                  id="MOBILE_NO"
                  value={userPhone}
                />
                <input
                  type="hidden"
                  name="SADAD_WEBCHECKOUT_PAGE_LANGUAGE"
                  id="SADAD_WEBCHECKOUT_PAGE_LANGUAGE"
                  /* value={i18n.dir() === "ltr" ? "ENG" : "Arb"} */
                  value="ENG"
                />

                <input type="hidden" name="VERSION" id="VERSION" value="1.1" />

                <input
                  type="hidden"
                  name="CALLBACK_URL"
                  id="CALLBACK_URL"
                  value="example.com"
                />

                <input
                  type="hidden"
                  name="productdetail[0][order_id]"
                  value={cartId}
                />
                {/*  <input
                type="hidden"
                name="productdetail[0][itemname]"
                value={nameEn}
              /> */}

                <input
                  type="hidden"
                  name="productdetail[0][amount]"
                  value={totalPrice}
                />
                <input
                  type="hidden"
                  name="productdetail[0][quantity]"
                  value={amount}
                />

                <input type="hidden" name="secret_key" value={"secret_key"} />
                <script type="text/javascript">
                  document.gosadad.submit();
                </script>
                {userPhone !== null ? (
                  <button
                    type="submit"
                    style={{
                      color: "#ffffff",
                      background: "#F5958D",
                      borderRadius: "50px",
                      padding: "0.8rem 1rem",
                      textDecoration: "none",
                      "&:hover": {
                        color: "#ffffff",
                        background: "#F5958D",
                      },
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {t("description.ProceedToCheckout")}
                  </button>
                ) : (
                  <PhoneAlertDialog />
                )}
              </form>
            ) : (
              <Link
                to="/cart"
                style={{
                  color: "#ffffff",
                  background: "#F5958D",
                  borderRadius: "50px",
                  padding: "0.8rem 1rem",
                  textDecoration: "none",
                  "&:hover": { color: "#ffffff", background: "#F5958D" },
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {t("description.ProceedToCheckout")}
              </Link>
            )}
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
