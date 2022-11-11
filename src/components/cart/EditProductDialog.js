import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DatePicker from "./DatePicker";
import axios from "axios";
import Swal from "sweetalert2";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function EditProductDialog({ item }) {
  console.log(item);
  const { t, i18n } = useTranslation();
  const imageURL = "example.com";
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [message, setMessage] = useState(item.special_message);
  const [note, setNote] = useState(item.note);
  const [payment, setPayment] = useState(item.payment_method);
  const [delivery, setDelivery] = useState(
    item.delivery_type === "delivery" && true
  );
  const [location, setLocation] = useState(item.delivery_location);
  const [dateAndTime, setDateAndTime] = useState("");
  const [totalPrice, setTotalPrice] = useState(item.total_price);
  const [state, setState] = useState();
  const handleClickOpenAddDialog = () => {
    setOpenAddDialog(true);
  };
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };
  const handleChangePayment = (e) => {
    setPayment(e.target.value);
  };
  const handleChangeDelivery = () => {
    setDelivery(true);
  };
  const handleChangePickUp = () => {
    setDelivery(false);
  };
  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleClickSave = () => {
    const data = {
      amount: item.amount,
      delivery_type: delivery ? "delivery" : "PickUp",
      delivery_info: dateAndTime,
      delivery_location: location,
      special_message: message,
      note: note,
      payment_method: payment,
    };

    axios
      .put(`example.com`, data, {
        headers: {
          "X-localization": i18n.language,
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Bearer " + localStorage.getItem("FlowerPotAuthorisation"),
        },
      })
      .then((response) => {
        setState(response.data.message);
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
        setState(error);
      });
    setOpenAddDialog(false);
  };
  /* online payment dialog */

  const [openOninePaymentDialog, setOpenOninePaymentDialog] = useState(false);

  const handleClickOpenOninePaymentDialog = () => {
    setOpenOninePaymentDialog(true);
  };

  const handleCloseOninePaymentDialog = () => {
    setOpenOninePaymentDialog(false);
  };
  return (
    <div>
      <IconButton
        sx={{
          "& .MuiButton-root:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={handleClickOpenAddDialog}
      >
        <EditIcon sx={{ color: "#F5958D" }} />
      </IconButton>
      <Dialog fullScreen open={openAddDialog} onClose={handleCloseAddDialog}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(15,1fr)",
            columnGap: "2rem",
          }}
        >
          <Box
            sx={{
              marginTop: "2rem",
              gridColumnStart: "2",
              gridColumnEnd: "6",
              display: "flex",
              flexDirection: "column",
            }}
            className="AddDialogPhotoBox"
          >
            <Box
              sx={{
                position: "relative",
                width: "calc(100%)",
                maxWidth: "calc(100%)",
                display: "inline-block",
                backgroundColor: "#fce2e2",
                borderRadius: "18px",
                marginBottom: "1rem",
              }}
            >
              <img
                src={`${imageURL}${item.flower.photo}`}
                alt={item.flower.photo}
                style={{
                  width: "calc(100% - 10%)",
                  maxWidth: "calc(100%)",
                  textDecration: "none",
                  padding: "1rem",
                  display: "block",
                  margin: "0 auto",
                  borderRadius: "18px",
                }}
              />
            </Box>

            <Box
              sx={{
                width: "80%",
                alignSelf: "center",
                marginTop: "1rem",
                background:
                  "linear-gradient(345.73deg, rgba(245, 247, 255, 0.44) 0%, rgba(235, 239, 250, 0.44) 101.34%)",
                borderRadius: "34px",
              }}
            >
              <Button
                onClick={handleChangePickUp}
                disableElevation
                sx={{
                  borderRadius: "34px",
                  border: "none",
                  fontWeight: "700",
                  fontSize: "1rem",
                  padding: "0.5rem 1rem",
                  width: "50%",
                  color: "#3A6A8F",
                  "&:active": {
                    background: "rgba(245, 149, 141, 0.66)",
                    border: "2px solid rgba(245, 149, 141, 0.66)",
                    boxShadow: "inset -3px -4px 12px rgba(0, 0, 0, 0.08)",
                    color: "#FEFEFE",
                  },
                  "&:focus": {
                    background: "rgba(245, 149, 141, 0.66)",
                    border: "2px solid rgba(245, 149, 141, 0.66)",
                    boxShadow: "inset -3px -4px 12px rgba(0, 0, 0, 0.08)",
                    color: "#FEFEFE",
                  },
                  "&:targer": {
                    background: "rgba(245, 149, 141, 0.66)",
                    border: "2px solid rgba(245, 149, 141, 0.66)",
                    boxShadow: "inset -3px -4px 12px rgba(0, 0, 0, 0.08)",
                    color: "#FEFEFE",
                  },
                  "&:hover": {
                    background: "none",
                  },
                }}
                className={delivery === false ? "activeButonAddDialog" : ""}
              >
                {t("description.PickUp")}
              </Button>
              <Button
                onClick={handleChangeDelivery}
                sx={{
                  borderRadius: "34px",
                  border: "none",
                  fontWeight: "700",
                  fontSize: "1rem",
                  padding: "0.5rem 1rem",
                  width: "50%",
                  color: "#3A6A8F",
                  "&:active": {
                    background: "rgba(245, 149, 141, 0.66)",
                    border: "2px solid rgba(245, 149, 141, 0.66)",
                    boxShadow: "inset -3px -4px 12px rgba(0, 0, 0, 0.08)",
                    color: "#FEFEFE",
                  },
                  "&:focus": {
                    background: "rgba(245, 149, 141, 0.66)",
                    border: "2px solid rgba(245, 149, 141, 0.66)",
                    boxShadow: "inset -3px -4px 12px rgba(0, 0, 0, 0.08)",
                    color: "#FEFEFE",
                  },
                  "&:targer": {
                    background: "rgba(245, 149, 141, 0.66)",
                    border: "2px solid rgba(245, 149, 141, 0.66)",
                    boxShadow: "inset -3px -4px 12px rgba(0, 0, 0, 0.08)",
                    color: "#FEFEFE",
                  },
                  "&:hover": {
                    background: "none",
                  },
                }}
                className={delivery === true ? "activeButonAddDialog" : ""}
              >
                {t("description.Delivery")}
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              marginTop: "2rem",
              gridColumnStart: "6",
              gridColumnEnd: "14",
              display: "flex",
              flexDirection: "column",
            }}
            className="AddDialogDescriptionBox"
          >
            <Typography
              sx={{ color: "#3A6A8F", fontSize: "3vw", fontWeight: "600" }}
              className="AddDialogProductTittleTextSize"
            >
              {i18n.dir() === "ltr" ? item.flower.nameEN : item.flower.nameAR}
            </Typography>
            <Typography
              sx={{ color: "#F5958D", fontSize: "1.3vw", fontWeight: "600" }}
              className="AddDialogProductCategoryTextSize"
            >
              <span
                style={{ color: "#B4B4B4", fontSize: "1vw" }}
                className="AddDialogProductCategorySpanTextSize"
              >
                {t("description.category")} :{" "}
              </span>
              {item.flower.categories.map((category) =>
                i18n.dir() === "ltr"
                  ? `${category.name_en}, `
                  : `${category.name_ar}, `
              )}
            </Typography>
            <Typography
              sx={{
                color: "#3A6A8F",
                fontSize: "1.2vw",
                fontWeight: "400",
                marginTop: "0.5rem",
              }}
              className="AddDialogProductCategoryTextSize"
            >
              <span
                style={{
                  color: "#B4B4B4",
                  fontSize: "1vw",
                  fontWeight: "600",
                }}
                className="AddDialogProductCategorySpanTextSize"
              >
                {t("description.Discribtion")} :{" "}
              </span>
              <br />
              {i18n.dir() === "ltr"
                ? item.flower.descriptionEN
                : item.flower.descriptionAR}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                marginTop: "2rem",
                columnGap: "2rem",
                rowGap: "0.5rem",
              }}
              className="AddDialogProductDeliveryInfoBox"
            >
              <Typography
                sx={{
                  color: "#F5958D",
                  fontSize: "1.5vw",
                  fontWeight: "600",
                }}
                className="AddDialogProductDeliveryInfoTextSize"
              >
                {delivery
                  ? t("description.DeliveryInfo")
                  : t("description.pickUpInfo")}
              </Typography>
              <Box
                sx={{ gridRowStart: "2", marginTop: "0.5rem" }}
                className="AddDialogProductDataInputsBox"
              >
                <DatePicker setDateAndTime={setDateAndTime} />

                {delivery && (
                  <TextField
                    className="palceholderFontFamily"
                    sx={{
                      width: "100%",
                      marginTop: "1rem",
                      input: {
                        color: "rgba(58, 106, 143, 0.74)",
                        fontWeight: "600",
                        backgroundColor: "#F3F3F3",
                        textAlign: i18n.dir() === "ltr" ? "left" : "right",
                      },
                      label: { color: "#3A6A8F", fontWeight: "600" },
                      direction: "ltr",
                      "& .MuiFilledInput-root:before": {
                        borderBottom: "0",
                      },
                      "& .MuiFilledInput-root:after": {
                        borderBottom: "0",
                      },
                      "& .MuiFilledInput-root:hover:not(.Mui-disabled):before":
                        {
                          borderBottom: "0",
                        },
                      "& .MuiFilledInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                    variant="filled"
                    id="outlined-search"
                    value={location}
                    onChange={handleChangeLocation}
                    placeholder={t("description.DeliveryLocation")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LocationOnRoundedIcon sx={{ color: "#F5958D" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#3A6A8F",
                    marginTop: "1rem",
                  }}
                >
                  {t("description.note")} :
                </Typography>
                <TextField
                  id="outlined-textarea"
                  className="palceholderFontFamily"
                  placeholder={t("description.noteplaceHolder")}
                  multiline
                  variant="filled"
                  rows={4}
                  sx={{
                    "& .MuiFilledInput-root": {
                      borderRadius: "8px",
                    },
                    "& .MuiFilledInput-root:before": {
                      borderBottom: "0",
                    },
                    "& .MuiFilledInput-root:after": {
                      borderBottom: "0",
                    },
                    "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                      borderBottom: "0",
                    },
                    "& label": {
                      transformOrigin:
                        i18n.dir() === "rtl" && "right !important",
                      left: i18n.dir() === "rtl" && "inherit !important",
                      right: i18n.dir() === "rtl" && "1.75rem !important",
                    },
                    width: "100%",
                    input: {
                      color: "rgba(58, 106, 143, 0.74)",
                      fontWeight: "600",
                      backgroundColor: "#F3F3F3",
                    },
                  }}
                  value={note}
                  onChange={handleChangeNote}
                />
              </Box>
              <Box
                sx={{
                  gridRowStart: "2",
                  justifySelf: "center",
                  gridColumnStart: "2",
                  gridColumnEnd: "3",
                  width: "90%",
                }}
                className="AddDialogProductDataInputsBox2"
              >
                <Typography sx={{ fontWeight: "600", color: "#3A6A8F" }}>
                  {t("description.SpecialMessage")} :
                </Typography>
                <TextField
                  id="outlined-textarea"
                  className="palceholderFontFamily"
                  placeholder={t("description.AddFeelingsToTheBouquet")}
                  multiline
                  variant="filled"
                  rows={4}
                  sx={{
                    "& .MuiFilledInput-root": {
                      borderRadius: "8px",
                    },
                    "& .MuiFilledInput-root:before": {
                      borderBottom: "0",
                    },
                    "& .MuiFilledInput-root:after": {
                      borderBottom: "0",
                    },
                    "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                      borderBottom: "0",
                    },
                    "& label": {
                      transformOrigin:
                        i18n.dir() === "rtl" && "right !important",
                      left: i18n.dir() === "rtl" && "inherit !important",
                      right: i18n.dir() === "rtl" && "1.75rem !important",
                    },
                    width: "100%",

                    input: {
                      color: "rgba(58, 106, 143, 0.74)",
                      fontWeight: "600",
                      backgroundColor: "#F3F3F3",
                    },
                  }}
                  value={message}
                  onChange={handleChangeMessage}
                />
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#3A6A8F",
                    marginTop: "1rem",
                  }}
                >
                  {t("description.PaymentMethod")} :
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={payment}
                    >
                      <FormControlLabel
                        value="CASH"
                        control={
                          <Radio
                            sx={{
                              color: "#F5958D",
                              "&.Mui-checked": {
                                color: "#F5958D",
                              },
                            }}
                          />
                        }
                        label={t("description.cash")}
                        onChange={handleChangePayment}
                      />
                      <FormControlLabel
                        value="OnlinePayment"
                        control={
                          <Radio
                            sx={{
                              color: "#F5958D",
                              "&.Mui-checked": {
                                color: "#F5958D",
                              },
                            }}
                          />
                        }
                        label={t("description.OnlinePayment")}
                        onChange={handleClickOpenOninePaymentDialog}
                      />
                    </RadioGroup>
                    <Dialog
                      open={openOninePaymentDialog}
                      onClose={handleCloseOninePaymentDialog}
                    >
                      <DialogContent>
                        <DialogContentText>
                          {t("description.commingSoon")}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseOninePaymentDialog}>
                          {t("description.Close")}
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </FormControl>
                </Box>
              </Box>
            </Box>

            <Stack
              sx={{ margin: "0.5rem 0" }}
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={i18n.dir() === "ltr" ? 8 : 0}
            >
              <Button onClick={handleCloseAddDialog}>
                {t("description.Cancel")}
              </Button>
              <Button
                sx={{
                  color: "#ffffff",
                  background: "#F5958D",
                  borderRadius: "50px",
                  padding: "0.8rem 1rem",
                  "&:hover": {
                    color: "#ffffff",
                    background: "#F5958D",
                  },
                }}
                onClick={handleClickSave}
              >
                {t("description.saveChanges")}
              </Button>
            </Stack>
          </Box>

          <Typography
            sx={{
              position: "absolute",
              top: 0,
              right: i18n.dir() === "ltr" ? "10%" : " ",
              left: i18n.dir() === "ltr" ? " " : "10%",
              background: "#3A6A8F",
              boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.03) ",
              borderRadius: " 0 0 42px 42px ",
              fontWeight: 700,
              color: "#ffffff",
              padding: "0.5rem 2rem",
              fontSize: "1.5vw",
            }}
            className="AddDialogPrice"
          >
            {totalPrice} {t("description.QAR")}
          </Typography>
        </Box>
      </Dialog>
    </div>
  );
}
