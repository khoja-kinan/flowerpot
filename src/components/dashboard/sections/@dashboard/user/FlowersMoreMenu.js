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
  InputLabel,
  Select,
  Typography,
  DialogContentText,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
// component
import Iconify from "../../../components/Iconify";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { getFlowersUrl } from "../../../constants/urls";

// ----------------------------------------------------------------------

export default function FlowersMoreMenu({
  flowerId,
  Arabic_name,
  English_name,
  token,
  Fprice,
  Fcategory,
  Foccasion,
  FDescAr,
  FDescEn,
  Foffer,
  flowePhoto,
  Fslider,
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("");
  const { t, i18n } = useTranslation();
  const imageURL = "example.com";
  /* 
      Flwoers
  */
  const [openFlowerEdit, setOpenFlowerEdit] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [arName, setArname] = useState(Arabic_name);
  const [enName, setEnName] = useState(English_name);
  const [price, setPrice] = useState(Fprice);
  const [category, setCategory] = useState(
    Fcategory.map((item) => {
      return item.id;
    })
  );
  console.log(category);
  const [occasion, setOccasion] = useState(
    Foccasion.map((item) => {
      return item.id;
    })
  );
  const [Desc_AR, setDesc_AR] = useState(FDescAr);
  const [Desc_EN, setDesc_EN] = useState(FDescEn);
  const [offer, setOffer] = useState(Foffer);
  const [addToSlider, setAddToSlider] = useState(Fslider);
  const [FlowerImageToShow, setFlowerImageToShow] = useState(flowePhoto);
  const [previewFlowerImage, setPreviewFlowerImage] = useState(null);
  const [flowerImageToUpload, setFlowerImageToUpload] = useState(null);
  const handleCaptureFlowerImage = (e) => {
    setFlowerImageToShow(null);
    setFlowerImageToUpload(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewFlowerImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleChangeArName = (event) => {
    setArname(event.target.value);
  };

  const handleChangeEnName = (event) => {
    setEnName(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleChangeCategory = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeOccasion = (event) => {
    const {
      target: { value },
    } = event;
    setOccasion(typeof value === "string" ? value.split(",") : value);
  };
  const handleChangeDescAR = (event) => {
    setDesc_AR(event.target.value);
  };
  const handleChangeDescEN = (event) => {
    setDesc_EN(event.target.value);
  };

  const handleChangeOffer = (event) => {
    setOffer(event.target.value);
  };

  const handleClickOpenFlower = () => {
    setOpenFlowerEdit(true);
  };

  const handleCloseEditFlower = () => {
    setOpenFlowerEdit(false);
  };
  const handleChangeAddToSliderYes = () => {
    setAddToSlider("1");
  };
  const handleChangeAddToSliderNo = () => {
    setAddToSlider("0");
  };

  const formData = new FormData();
  const handleConfirmEditFlower = () => {
    arName !== Arabic_name && formData.append("nameAR", arName);
    enName !== English_name && formData.append("nameEN", enName);
    price !== Fprice && formData.append("price", price);

    category.map((item, index) =>
      formData.append(`category_id[${index}]`, item)
    );
    occasion.map((item, index) =>
      formData.append(`occasions_id[${index}]`, item)
    );
    Desc_AR !== FDescAr && formData.append("descriptionAR", Desc_AR);
    Desc_EN !== FDescEn && formData.append("descriptionEN", Desc_EN);
    addToSlider !== Fslider && formData.append("slider", addToSlider);
    offer !== Foffer && formData.append("offer", offer === null ? 0 : offer);
    flowerImageToUpload !== null &&
      formData.append("photo", flowerImageToUpload);
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "content-type": "multipart/form-data",
      "X-localization": i18n.language,
    };
    axios
      .post(`${getFlowersUrl}/update/${flowerId}`, formData, { headers })
      .then((response) => {
        setState({ message: response.data.message });
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    setOpenFlowerEdit(false);
    setIsOpen(false);
  };
  /* Detelt Dialog */

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
        `${getFlowersUrl}/delete/${flowerId}`,
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
          onClick={handleClickOpenFlower}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={t("Dashboard.FlowerPageEditButton")}
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
          fullScreen
          disableEscapeKeyDown
          open={openFlowerEdit}
          onClose={handleCloseEditFlower}
        >
          <DialogTitle> {t("Dashboard.FlowerPageEditButton")} </DialogTitle>
          <DialogContent
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <FormControl sx={{ m: 1, width: "100%" }}>
                <TextField
                  variant="filled"
                  id="filled-basic"
                  label={t("Dashboard.ComunityDialogArName")}
                  onChange={handleChangeArName}
                  value={arName}
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "100%" }}>
                <TextField
                  variant="filled"
                  id="filled-basic"
                  label={t("Dashboard.ComunityDialogEnName")}
                  onChange={handleChangeEnName}
                  value={enName}
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "100%" }}>
                <TextField
                  variant="filled"
                  id="filled-basic"
                  label={t("Dashboard.FlowerPageTabelPrice")}
                  onChange={handleChangePrice}
                  value={price}
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "100%" }} variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  {t("Dashboard.FlowerPageTabelHeadCateroty")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={category}
                  multiple
                  onChange={handleChangeCategory}
                >
                  <MenuItem value={1}>
                    {i18n.dir() === "ltr" ? "Vase" : "فازا"}
                  </MenuItem>
                  <MenuItem value={2}>
                    {i18n.dir() === "ltr" ? "Hand Bouquet" : "باقة يد"}
                  </MenuItem>
                  <MenuItem value={3}>
                    {i18n.dir() === "ltr" ? "Flower Box" : "صندوق زهور"}
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, width: "100%" }} variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  {t("Dashboard.FlowerPageTabelHeadOccasion")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={occasion}
                  multiple
                  onChange={handleChangeOccasion}
                >
                  <MenuItem value={1}>
                    {i18n.dir() === "ltr" ? "Thank you" : "شكراً لك"}
                  </MenuItem>
                  <MenuItem value={2}>
                    {i18n.dir() === "ltr" ? "Love" : "حب"}
                  </MenuItem>
                  <MenuItem value={3}>
                    {i18n.dir() === "ltr" ? "Birthday" : "عيد ميلاد"}
                  </MenuItem>
                  <MenuItem value={4}>
                    {i18n.dir() === "ltr" ? "Mother Day" : "عيد الأم"}
                  </MenuItem>
                  <MenuItem value={5}>
                    {i18n.dir() === "ltr" ? "Teachers Day" : "عيد المعلم"}
                  </MenuItem>
                  <MenuItem value={6}>
                    {i18n.dir() === "ltr" ? "New Baby" : "مولود جديد"}
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "90%",
                margin: "0 2rem",
              }}
            >
              <FormControl sx={{ m: 1, width: "100%" }}>
                <TextField
                  variant="filled"
                  id="filled-multiline-static"
                  multiline
                  rows={4}
                  label={t("Dashboard.FlowerDescriptionAr")}
                  onChange={handleChangeDescAR}
                  value={Desc_AR}
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "100%" }}>
                <TextField
                  variant="filled"
                  id="filled-multiline-static"
                  multiline
                  rows={4}
                  label={t("Dashboard.FlowerDescriptionEn")}
                  onChange={handleChangeDescEN}
                  value={Desc_EN}
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "100%" }}>
                <TextField
                  variant="filled"
                  id="filled-basic"
                  type="number"
                  label={t("Dashboard.FlowerPageTabelOffer")}
                  onChange={handleChangeOffer}
                  value={offer}
                />
              </FormControl>
              <FormControl>
                <Typography>{t("Dashboard.AddToSlider")}</Typography>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    checked={addToSlider === "1" ? true : false}
                    control={
                      <Radio
                        sx={{
                          color: "#3f7093",
                          "&.Mui-checked": {
                            color: "#3f7093",
                          },
                        }}
                      />
                    }
                    label={t("Dashboard.Yes")}
                    onChange={handleChangeAddToSliderYes}
                  />
                  <FormControlLabel
                    checked={addToSlider === "0" ? true : false}
                    control={
                      <Radio
                        sx={{
                          color: "#3f7093",
                          "&.Mui-checked": {
                            color: "#3f7093",
                          },
                        }}
                      />
                    }
                    label={t("Dashboard.No")}
                    onChange={handleChangeAddToSliderNo}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                width: "90%",
              }}
            >
              <Typography>{t("Dashboard.FlowerImage")}</Typography>
              <FormControl sx={{ m: 1, maxWidth: "100%" }}>
                <Box className="upload__image-wrapper">
                  {previewFlowerImage ? (
                    <Box className="image-item">
                      <img src={previewFlowerImage} alt="" width="100%" />
                      <Box className="image-item__btn-wrapper">
                        <Button
                          sx={{ margin: "1rem 0" }}
                          variant="outlined"
                          onClick={() => setPreviewFlowerImage(null)}
                        >
                          {t("Dashboard.remove")}
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Button
                      sx={{ margin: "1rem 0" }}
                      variant="outlined"
                      component="label"
                    >
                      {t("Dashboard.uploadFlowerImage")}
                      <input
                        type="file"
                        accept="image/png"
                        hidden
                        onChange={handleCaptureFlowerImage}
                      />
                    </Button>
                  )}
                  {FlowerImageToShow && (
                    <Box className="image-item" sx={{ margin: "1rem 0" }}>
                      <img
                        src={`${imageURL}${FlowerImageToShow}`}
                        alt=""
                        width="80%"
                      />
                      <Box className="image-item__btn-wrapper">
                        <Button
                          sx={{ margin: "1rem 0" }}
                          variant="outlined"
                          onClick={() => setFlowerImageToShow(null)}
                        >
                          {t("Dashboard.remove")}
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleCloseEditFlower}>
              {t("description.Cancel")}{" "}
            </Button>
            <Button onClick={handleConfirmEditFlower}>
              {t("description.Ok")}{" "}
            </Button>
          </DialogActions>
        </Dialog>
        {/* Delete Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {t("Dashboard.DeleteFlowerDialogTitle")}
          </DialogTitle>
          <DialogContent
            id="alert-dialog-description"
            sx={{ padding: "2rem", marginTop: "2rem" }}
          >
            <DialogContentText>
              {t("Dashboard.DeleteFlowerDialogMessage")}
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
      </Menu>
    </>
  );
}
