import { filter } from "lodash";
/* import { sentenceCase } from "change-case"; */
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  LinearProgress,
} from "@mui/material";
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {
  CartsMoreMenu,
  UserListHead,
  UserListToolbar,
} from "../sections/@dashboard/user";
//
/* import USERLIST from "../_mocks_/user"; */
// get Users Function
/* import { getSpecializations } from "../controller/SpecializationsController";
 */ import { getCartsUrl } from "../constants/urls";

import axios from "axios";
import { useTranslation } from "react-i18next";

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
        _user.flower.nameAR.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.flower.nameEN.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Carts() {
  const { t, i18n } = useTranslation();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [cartsList, setCartsList] = useState();
  let navigate = useNavigate();
  const token = localStorage.getItem("FAT");

  useEffect(() => {
    function fecthData() {
      if (token == null) {
        navigate("/");
      } else {
        axios
          .get(getCartsUrl, {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              setCartsList(response.data.data);
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }
    fecthData();
  }, [navigate]);
  if (cartsList === undefined) {
    return <LinearProgress />;
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = cartsList.map((n) => n.name);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cartsList.length) : 0;

  const filteredUsers = applySortFilter(
    cartsList,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredUsers.length === 0;
  const TABLE_HEAD = [
    {
      id: "username",
      label: t("description.UsersPageTableHeadUsername"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "name",
      label: t("Dashboard.FlowerPageTabelHeadArName"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },

    {
      id: "amount",
      label: t("Dashboard.amount"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },

    {
      id: "deliveryType",
      label: t("description.DeliveryType"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },

    {
      id: "paymentMethod",
      label: t("description.PaymentMethod"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "TotalPrice",
      label: t("Dashboard.FlowerPageTabelPrice"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "order_time",
      label: t("Dashboard.FlowerPageTabelOrderTime"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    {
      id: "status",
      label: t("Dashboard.cartStatus"),
      alignRight: i18n.dir() === "ltr" ? false : true,
    },
    { id: "" },
  ];

  console.log(cartsList);
  return (
    <Page title={t("description.CartsPageTitle")}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {t("Dashboard.carts")}
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            placeHolder={t("Dashboard.cartsPageSearchPlaceholder")}
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
                  rowCount={cartsList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {cartsList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name_ar, name_en } = row;
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
                            {row.user.name}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {i18n.dir() === "ltr"
                              ? row.flower.nameEN
                              : row.flower.nameAR}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.amount}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.delivery_type === "PickUp"
                              ? i18n.dir() === "ltr"
                                ? "Pick Up"
                                : "استلام باليد"
                              : i18n.dir() === "ltr"
                              ? "Delivery"
                              : "توصيل"}
                          </TableCell>

                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.payment_method === "CASH"
                              ? i18n.dir() === "ltr"
                                ? "Cash"
                                : "نقدأ"
                              : i18n.dir() === "ltr"
                              ? "Online Payment"
                              : "دفع ألكتروني"}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.total_price} {t("description.QAR")}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                          >
                            {row.delivery_date}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "left" : "right"}
                            sx={{
                              color:
                                row.status === "pending"
                                  ? "orange"
                                  : row.status === "rejected"
                                  ? "red"
                                  : "green",
                            }}
                          >
                            {row.status}
                          </TableCell>
                          <TableCell
                            align={i18n.dir() === "ltr" ? "right" : "left"}
                          >
                            <CartsMoreMenu
                              id={row.id}
                              token={token}
                              item={row}
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
            sx={{ direction: "ltr" }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={cartsList.length}
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
