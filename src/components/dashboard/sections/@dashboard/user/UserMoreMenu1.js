import { useRef, useState } from "react";
/* import { Link as RouterLink } from "react-router-dom"; */
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  TextField,
  DialogContentText,
} from "@mui/material";
// component
import Iconify from "../../../components/Iconify";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  getDashboardusersDelete,
  getDashboardusersEdit,
} from "../../../constants/urls";

// ----------------------------------------------------------------------

export default function UserMoreMenu1({ user_id, token }) {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("");

  /* 
      User Status
  */
  const [openEditStatus, setOpenEditStatus] = useState(false);
  const [status, setStatus] = useState("");
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleClickOpenEditStatus = () => {
    setOpenEditStatus(true);
  };

  const handleCloseEditStatus = () => {
    setOpenEditStatus(false);
  };

  const handleSubmitEditStatus = () => {
    const data = { role: status };
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "X-localization": i18n.language,
    };
    axios
      .post(`${getDashboardusersEdit}/${user_id}`, data, {
        headers,
      })
      .then((response) => {
        setState({ message: response.data.message });
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });

    setOpenEditStatus(false);
  };
  /* Detelt Dialog */
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setIsOpen(false);
  };

  const handleConfirmDelete = () => {
    axios
      .post(
        `${getDashboardusersDelete}/${user_id}`,
        { name: "" },
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "X-localization": i18n.language,
          },
        }
      )
      .then((response) => {
        setState({ message: response.data.message });
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    setOpenDeleteDialog(false);
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
          onClick={handleClickOpenEditStatus}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={t("description.UsersPageEditUserStatus")}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpenDeleteDialog}
        >
          <ListItemIcon>
            <Iconify icon="ep:delete-filled" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={t("Dashboard.Delete")}
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <Dialog
          disableEscapeKeyDown
          open={openEditStatus}
          onClose={handleCloseEditStatus}
        >
          <DialogTitle>
            {t("description.EditUserStatusDialogTitle")}{" "}
          </DialogTitle>
          <DialogContent sx={{ width: "20rem" }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-dialog-select-label">
                  {t("description.NewUserDialogAccountType")}
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={status}
                  onChange={handleChangeStatus}
                  input={
                    <OutlinedInput
                      label={t("description.NewUserDialogAccountType")}
                    />
                  }
                >
                  <MenuItem value={1}>
                    {t("description.NewUserDialogAccountTypeAdmin")}{" "}
                  </MenuItem>
                  <MenuItem value={0}>
                    {t("description.NewUserDialogAccountTypeUser")}
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseEditStatus}>
              {t("description.Cancel")}
            </Button>
            <Button onClick={handleSubmitEditStatus}>
              {t("description.Ok")}
            </Button>
          </DialogActions>
        </Dialog>
      </Menu>
      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("Dashboard.DeleteUserDialogTitle")}
        </DialogTitle>
        <DialogContent
          id="alert-dialog-description"
          sx={{ padding: "2rem", marginTop: "2rem" }}
        >
          <DialogContentText>
            {t("Dashboard.DeleteUserDialogMessage")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>
            {" "}
            {t("Dashboard.Cancel")}
          </Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            {t("Dashboard.Ok")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
