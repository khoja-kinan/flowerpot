import { useRef, useState } from "react";
// material
import { alpha } from "@mui/material/styles";
import { Button, Box, Typography, Avatar, IconButton } from "@mui/material";
// components

//

import { useTranslation } from "react-i18next";
import MenuPopover from "./MenuPopover";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover({ user }) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const logOut = () => {
    const headers = {
      Authorization: "Bearer " + user.token,
    };
    const data = {};
    axios
      .post("example.com", data, { headers })
      .then((response) => {})
      .catch((error) => {
        console.error("There was an error!", error);
      });

    localStorage.removeItem("FlowerPotUsername");
    localStorage.removeItem("FlowerPotUserEmail");
    localStorage.removeItem("FlowerPotUserPhone");
    localStorage.removeItem("FlowerPotAuthorisation");
    location.pathname === "/" ? window.location.reload() : navigate("/");
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar>{user.userName.slice(0, 1).toUpperCase()}</Avatar>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          display: "grid",
          width: "25%",
          px: 2,
        }}
        className="accountPopoverWidthMobile"
      >
        <Box sx={{ my: 1.5 }} className="accountPopoverMobile">
          <Link to="/profile">
            <Typography
              className="accountPopoverMobileTextSize"
              variant="subtitle1"
              noWrap
              sx={{ color: "#3A6A8F", fontWeight: "600" }}
            >
              {user.userName}
            </Typography>
          </Link>
          <Typography
            className="accountPopoverMobileTextSize"
            variant="body2"
            sx={{ color: "text.secondary" }}
            noWrap
          >
            {user.email}
          </Typography>
          <Link
            className="accountPopoverMobileTextSize"
            to="/edit-profile"
            style={{ color: "#E87B5A", fontSize: "0.8rem" }}
          >
            {t("description.changePassWord")}
          </Link>
        </Box>
        <Box
          sx={{ width: "100%", height: "100%" }}
          className="accountPopoverAvatarMobile"
        >
          <Avatar
            sx={{
              width: "80%",
              height: "80%",
              margin: "0.5rem auto",
              bgcolor: "#3a6a8f",
            }}
            className="accountPopoverAvatarImgMobile"
          >
            {user.userName.slice(0, 1).toUpperCase()}
          </Avatar>
        </Box>

        <Button
          className="accountPopoversignOutMobile accountPopoverMobileTextSize"
          sx={{
            color: "#E87B5A",
            fontSize: "0.8rem",
            gridRowStart: "2",
            gridColumn: "span 2",
            justifySelf: "end",
          }}
          onClick={logOut}
        >
          {t("description.AccountPopoverLogout")}
        </Button>
      </MenuPopover>
    </>
  );
}
