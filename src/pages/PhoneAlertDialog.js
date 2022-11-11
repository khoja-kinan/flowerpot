import { useRef, useState } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import { Typography, DialogActions } from "@mui/material";
// component
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
// ----------------------------------------------------------------------

export default function PhoneAlertDialog() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <a
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
        ref={ref}
        onClick={() => setIsOpen(true)}
      >
        {t("description.ProceedToCheckout")}
      </a>
      <Dialog
        disableEscapeKeyDown
        open={isOpen}
        fullWidth
        onClose={() => setIsOpen(false)}
      >
        <DialogContent
          sx={{
            height: 120,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography>{t("description.checkPhone")}</Typography>
        </DialogContent>
        <DialogActions>
          <Link to="/edit-profile" style={{ textDecoration: "none" }}>
            {" "}
            {t("description.visitProgile")}
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}
