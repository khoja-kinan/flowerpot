import { filter } from "lodash";
/* import { sentenceCase } from "change-case"; */
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  FormControl,
  TextField,
  DialogActions,
  LinearProgress,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  FlowersMoreMenu,
  UserListHead,
  UserListToolbar,
} from "../sections/@dashboard/user";
//
/* import USERLIST from "../_mocks_/user"; */
// get Users Function
/* import { getSpecializations } from "../controller/SpecializationsController";
 */ import { AddFlowersUrl, getFlowersUrl } from "../constants/urls";

import axios from "axios";
import { useTranslation } from "react-i18next";
import Label from "../components/Label";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.nameAR.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.nameEN.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Flowers() {
  const { t, i18n } = useTranslation();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [arName, setArname] = useState();
  const [enName, setEnName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState([]);
  const [occasion, setOccasion] = useState([]);
  const [Desc_AR, setDesc_AR] = useState();
  const [Desc_EN, setDesc_EN] = useState();
  const [offer, setOffer] = useState(0);
  const [openFlowerEdit, setOpenFlowerEdit] = useState(false);
  const [FlowerImageToShow, setFlowerImageToShow] = useState();
  const [previewFlowerImage, setPreviewFlowerImage] = useState(null);
  const [flowerImageToUpload, setFlowerImageToUpload] = useState(null);
  const [state, setState] = useState("");
  const imageURL = "example.com";
  const [addToSlider, setAddToSlider] = useState();

  const [flowersList, setFlowersList] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("FAT");
  useEffect(() => {
    function fecthData() {
      if (token === null) {
        navigate("/");
      } else {
        axios
          .get(getFlowersUrl, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              setFlowersList(response.data.data);
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }
    fecthData();
  }, [navigate]);
  if (flowersList === undefined) {
    return <LinearProgress />;
  }
  const TABLE_HEAD = [
    {
      id: "name",
      label: t("Dashboard.FlowerPageTabelHeadArName"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "category",
      label: t("Dashboard.FlowerPageTabelHeadCateroty"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "Occasoin",
      label: t("Dashboard.FlowerPageTabelHeadOccasion"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "price",
      label: t("Dashboard.FlowerPageTabelPrice"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    { id: "" },
  ];
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = flowersList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - flowersList.length) : 0;

  const filteredUsers = applySortFilter(
    flowersList,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredUsers.length === 0;
  /* 
      New Flower
  */

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
  const handleChangeAddToSliderYes = () => {
    setAddToSlider("1");
  };
  const handleChangeAddToSliderNo = () => {
    setAddToSlider("0");
  };
  const handleClickOpenFlower = () => {
    setOpenFlowerEdit(true);
  };

  const handleCloseEditFlower = () => {
    setOpenFlowerEdit(false);
  };
  const formData = new FormData();
  const handleConfirmEditFlower = () => {
    category.map((item, index) =>
      formData.append(`category_id[${index}]`, item)
    );
    occasion.map((item, index) =>
      formData.append(`occasions_id[${index}]`, item)
    );
    formData.append("nameAR", arName);
    formData.append("nameEN", enName);
    formData.append("price", price);
    formData.append("descriptionAR", Desc_AR);
    formData.append("descriptionEN", Desc_EN);
    formData.append("offer", offer);
    formData.append("slider", addToSlider);
    formData.append("photo", flowerImageToUpload);
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "content-type": "multipart/form-data",
    };
    axios
      .post(AddFlowersUrl, formData, { headers })
      .then((response) => {
        setState({ message: response.data.message });
        window.location.reload();
      })
      .catch((error) => {
        setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    setOpenFlowerEdit(false);
  };
  return (
    <Page title={t("description.FlowersPageTitle")}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {t("Dashboard.sideBarFlowers")}
          </Typography>
          <Button variant="contained" onClick={handleClickOpenFlower}>
            {t("Dashboard.FlowerPageNewButton")}
          </Button>
        </Stack>
        <Dialog
          fullScreen
          disableEscapeKeyDown
          open={openFlowerEdit}
          onClose={handleCloseEditFlower}
        >
          <DialogTitle> {t("Dashboard.FlowerPageNewButton")} </DialogTitle>
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
        <Card>
          <UserListToolbar
            placeHolder={t("Dashboard.FlowerPageSearchPlaceholder")}
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={flowersList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name_ar, name_en, image } = row;
                      const isItemSelected = selected.indexOf(name_ar) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {i18n.dir() === "ltr" ? row.nameEN : row.nameAR}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.categories.map((item) => (
                              <Label
                                variant="ghost"
                                key={item.id}
                                style={{ margin: "0.2rem" }}
                              >
                                {i18n.dir() === "ltr"
                                  ? `${item.name_en}`
                                  : `${item.name_ar}`}
                              </Label>
                            ))}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.occasions.map((item) => (
                              <Label
                                variant="ghost"
                                key={item.id}
                                style={{ margin: "0.2rem" }}
                              >
                                {i18n.dir() === "ltr"
                                  ? `${item.name_en}`
                                  : `${item.name_ar}`}
                              </Label>
                            ))}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.price}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "right" : "left"}
                          >
                            <FlowersMoreMenu
                              flowerId={row.id}
                              Arabic_name={row.nameAR}
                              English_name={row.nameEN}
                              Fprice={row.price}
                              Fcategory={row.categories}
                              Foccasion={row.occasions}
                              FDescAr={row.descriptionAR}
                              FDescEn={row.descriptionEN}
                              Foffer={row.offer}
                              flowePhoto={row.photo}
                              Fslider={row.slider}
                              token={token}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            style={{ direction: "ltr" }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={flowersList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t("Dashboard.UsersPageLabelRowsPerPage")}
          />
        </Card>
      </Container>
    </Page>
  );
}
