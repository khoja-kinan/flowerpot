import Button from "@mui/material/Button";
import * as React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import addBtn from "../../assets/mayLike/addBtn.png";
import { useEffect, useState } from "react";
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
import RemoveIcon from "@mui/icons-material/Remove";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AddIcon from "@mui/icons-material/Add";
import DatePicker from "./DatePicker";
import { useTranslation } from "react-i18next";
import AlertDialog from "./AlertDialog";

export default function AddDialog({ item }) {
  const { t, i18n } = useTranslation();
  const imageURL = "example.com";
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState();
  const [note, setNote] = useState();
  const [payment, setPayment] = useState("");
  const [delivery, setDelivery] = useState(true);
  const [location, setLocation] = useState();
  const [dateAndTime, setDateAndTime] = useState("");
  const [totalPrice, setTotalPrice] = useState(item.price);
  useEffect(() => {
    setTotalPrice((item.price - (item.price * item.offer) / 100) * count);
  }, [count]);

  const handleClickOpenAddDialog = () => {
    setOpenAddDialog(true);
  };
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleAddOne = () => {
    setCount(count + 1);
  };

  const handleRemoveOne = () => {
    setCount(count - 1);
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
      <Button
        sx={{
          "& .MuiButton-root:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={handleClickOpenAddDialog}
      >
        <img
          src={addBtn}
          alt={addBtn}
          style={{
            borderRadius: "18px",
            width: "4rem",
          }}
        />
      </Button>
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
                src={`${imageURL}${item.photo}`}
                alt={item.photo}
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
                background: "rgba(245, 149, 141, 0.66)",
                borderRadius: "34px",
                width: "50%",
                /* padding: "0.3rem 0", */
                alignSelf: "center",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{
                  borderRadius: "70%",
                  background:
                    "linear-gradient(359.04deg, #FEF2F1 -89.99%, #F5F8FF 119.48%)",
                  color: "#3A6A8F",
                }}
                onClick={handleRemoveOne}
                disabled={count === 1}
              >
                <RemoveIcon fontSize="medium" />
              </IconButton>
              <Typography
                sx={{ color: "#3A6A8F", fontWeight: "800", fontSize: "2rem" }}
              >
                {count}
              </Typography>
              <IconButton
                sx={{
                  borderRadius: "70%",
                  background:
                    "linear-gradient(359.04deg, #FEF2F1 -89.99%, #F5F8FF 119.48%)",
                  color: "#3A6A8F",
                }}
                onClick={handleAddOne}
              >
                <AddIcon fontSize="medium" />
              </IconButton>
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
              {i18n.dir() === "ltr" ? item.nameEN : item.nameAR}
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
              {item.categories.map((category) =>
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
              {i18n.dir() === "ltr" ? item.descriptionEN : item.descriptionAR}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                marginTop: "1rem",
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
                        borderRadius: "8px",
                        backgroundColor: "#F3F3F3",
                        textAlign: i18n.dir() === "ltr" ? "left" : "right",
                      },

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
                    placeholder={t("description.DeliveryLocation")}
                    variant="filled"
                    value={location}
                    onChange={handleChangeLocation}
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
                  className="palceholderFontFamily"
                  id="outlined-textarea"
                  placeholder={t("description.noteplaceHolder")}
                  multiline
                  required
                  variant="filled"
                  rows={4}
                  sx={{
                    "& .MuiFilledInput-root": {
                      borderRadius: "8px",
                    },
                    "& label": {
                      transformOrigin:
                        i18n.dir() === "rtl" && "right !important",
                      left: i18n.dir() === "rtl" && "inherit !important",
                      right: i18n.dir() === "rtl" && "1.75rem !important",
                    },
                    width: "100%",
                    "& .MuiFilledInput-root:before": {
                      borderBottom: "0",
                    },
                    "& .MuiFilledInput-root:after": {
                      borderBottom: "0",
                    },
                    "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                      borderBottom: "0",
                    },

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
                  className="palceholderFontFamily"
                  id="outlined-textarea"
                  placeholder={t("description.AddFeelingsToTheBouquet")}
                  multiline
                  variant="filled"
                  rows={4}
                  sx={{
                    "& .MuiFilledInput-root": {
                      borderRadius: "8px",
                    },
                    "& label": {
                      transformOrigin:
                        i18n.dir() === "rtl" && "right !important",
                      left: i18n.dir() === "rtl" && "inherit !important",
                      right: i18n.dir() === "rtl" && "1.75rem !important",
                    },

                    width: "100%",
                    "& .MuiFilledInput-root:before": {
                      borderBottom: "0",
                    },
                    "& .MuiFilledInput-root:after": {
                      borderBottom: "0",
                    },
                    "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                      borderBottom: "0",
                    },
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
                        onChange={handleChangePayment}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Box>
            </Box>

            <Stack
              sx={{ margin: "1rem 0" }}
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={i18n.dir() === "ltr" ? 8 : 0}
            >
              <Button onClick={handleCloseAddDialog}>
                {t("description.Cancel")}
              </Button>
              <AlertDialog
                nameAr={item.nameAR}
                nameEn={item.nameEN}
                flowerId={item.id}
                amount={count}
                totalPrice={totalPrice}
                deliveryType={delivery}
                dateAndTime={dateAndTime}
                deliveryLocation={location}
                specialMesssage={message}
                note={note}
                payment={payment}
                setOpenAddDialog={setOpenAddDialog}
              />
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
