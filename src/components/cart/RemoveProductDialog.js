import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useTranslation } from "react-i18next";
import removeIcon from "../../assets/cart/removeIcon.png";
import { Stack } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";

export default function RemoveProductDialog({ arName, enName, id }) {
  const [open, setOpen] = React.useState(false);
  const { t, i18n } = useTranslation();
  const [removeState, setRemoveState] = React.useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveProduct = () => {
    axios
      .delete(`example.com`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Bearer " + localStorage.getItem("FlowerPotAuthorisation"),
        },
      })
      .then((response) => {
        setRemoveState(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
        });
        setRemoveState(error);
      });
    setOpen(false);
  };
  return (
    <div>
      <Button
        sx={{ margin: "0 2rem", color: "#B4B4B4" }}
        onClick={handleClickOpen}
      >
        {t("description.reomve")}{" "}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Stack justifyContent="center" sx={{ padding: "1rem" }}>
          <img src={removeIcon} alt={removeIcon} style={{ margin: "0 auto" }} />
        </Stack>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {i18n.dir() === "ltr"
              ? `Are you sure you want to remove ${enName} from your cart?`
              : `هل أنت متأكد أنك تريد إزالة ${arName} من عربة التسوق الخاصة بك؟`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#B4B4B4" }} onClick={handleClose}>
            {t("description.colse")}
          </Button>
          <Button
            onClick={handleRemoveProduct}
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
          >
            {t("description.confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
