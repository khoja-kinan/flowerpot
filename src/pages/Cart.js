import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { useTranslation } from "react-i18next";
import EditProductDialog from "../components/cart/EditProductDialog";
import RemoveProductDialog from "../components/cart/RemoveProductDialog";
import { Link } from "react-router-dom";
import checkedOut from "../assets/cart/checkedOut.png";
import { useNavigate } from "react-router-dom";
import CartSkeleton from "../components/skeleton/CartSkeleton";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import PhoneAlertDialog from "./PhoneAlertDialog";

const Cart = () => {
  const navigate = useNavigate();
  const search = useLocation().search;

  const status = new URLSearchParams(search).get("status");
  const { t, i18n } = useTranslation();

  const [cart, setCart] = useState();
  const [loading, setLoading] = useState(true);
  const imageURL = "example.com";
  const URL = `example.com`;
  const userEmail = localStorage.getItem("FlowerPotUserEmail");
  const userPhone = localStorage.getItem("FlowerPotUserPhone");
  const token = localStorage.getItem("FlowerPotAuthorisation");
  useEffect(() => {
    async function fecthData() {
      await axios
        .get(URL, {
          headers: {
            "X-localization": i18n.language,
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data.data;
            setCart(data);
            setLoading(false);
          }
        })
        .catch((error) => {
          /* console.log(error.response); */
          setLoading(false);
        });
    }
    fecthData();
  }, []);

  let cartCondition = cart === undefined ? 0 : cart.length;
  if (status === "success") {
    Swal.fire({
      position: "center",
      icon: "success",
      title:
        i18n.dir() === "ltr"
          ? "Payment completed successfully"
          : "تم الدفع بنجاح",
      showConfirmButton: false,
      timer: 3000,
    });
  }
  if (status === "failure") {
    Swal.fire({
      icon: "error",
      text:
        i18n.dir() === "ltr"
          ? "An error occurred during payment, please try again"
          : "حدث خطأ أثناء الدفع يرجى إعادة المحاولة",
    });
  }
  return loading ? (
    <CartSkeleton />
  ) : (
    <Box
      sx={{
        background:
          "linear-gradient(359.04deg, #FEF2F1 -89.99%, #F5F8FF 119.48%)",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
          rowGap: "2rem",
        }}
      >
        <Box
          sx={{
            gridColumnStart: "2",
            gridColumnEnd: "12",
            borderBottom: "1px solid rgba(58, 106, 143, 0.49)",
            paddingBottom: "1rem",
          }}
        >
          {i18n.dir() === "ltr" ? (
            <Typography sx={{ color: "#3A6A8F", fontSize: "3rem" }}>
              <span style={{ color: "#F5958D", fontSize: "2rem" }}>My</span>
              Cart
            </Typography>
          ) : (
            <Typography sx={{ color: "#3A6A8F", fontSize: "3rem" }}>
              سلتي
            </Typography>
          )}
        </Box>
        <Box sx={{ gridColumnStart: "2", gridColumnEnd: "12" }}>
          {cartCondition === 0 ? (
            <Typography
              sx={{
                color: "#3A6A8F",
                fontSize: "1.2rem",
                margin: "2rem 0 7rem 0",
              }}
            >
              {t("description.cartEmptyText1")}{" "}
              <Link
                to="/our-shop/all"
                style={{ color: "#f5a19b", textDecoration: "none" }}
              >
                {t("description.SHOP")}{" "}
              </Link>
              {t("description.cartEmptyText2")}
            </Typography>
          ) : (
            cart.map((item) => (
              <Box
                key={item.id}
                sx={{
                  margin: "2rem 0 ",
                  gridColumnStart: "1",
                  gridColumnEnd: "13",
                  display: "grid",
                  gridTemplateColumn: "repeat(12,1fr)",
                  gridAutoColumns: "1fr",
                  columnGap: "0.5rem",
                  background: "#FEFEFE",
                  boxShadow:
                    "0px 8.31034px 21.3695px rgba(134, 136, 239, 0.37)",
                  borderRadius: "18px",
                }}
              >
                <Box
                  sx={{
                    gridColumnStart: "1",
                    gridColumnEnd: "3",
                    width: "100%",
                    alignSelf: "center",
                    borderRadius: "18px",
                    padding: "0.5rem",
                  }}
                  className="cartPageImageBoxContainer"
                >
                  <img
                    src={`${imageURL}${item.flower.photo}`}
                    alt={item.flower.photo}
                    style={{
                      width: "100%",
                      borderRadius: "18px",
                    }}
                    className="cartPageImageWidth"
                  />
                </Box>
                <Box
                  sx={{
                    gridColumnStart: "3",
                    gridColumnEnd: "12",
                    padding: "1rem",
                    display: "grid",
                    gridTemplateColumn: "repeat(2,1fr)",
                    gridAutoRows: "1fr",
                  }}
                  className="cartPageContentBoxContainer"
                >
                  <Box
                    sx={{
                      gridColumnStart: "1",
                      gridColumnEnd: "2",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#3A6A8F",
                        fontWeight: "600",
                        fontSize: "1.5rem",
                      }}
                    >
                      {i18n.dir() === "ltr"
                        ? item.flower.nameEN
                        : item.flower.nameAR}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#F5958D",
                        fontSize: "1.5vw",
                        fontWeight: "600",
                      }}
                      className="AddDialogProductCategoryTextSize"
                    >
                      <span
                        style={{ color: "#B4B4B4", fontSize: "1vw" }}
                        className="AddDialogProductCategorySpanTextSize"
                      >
                        {t("description.category")} :{" "}
                      </span>
                      {i18n.dir() === "ltr"
                        ? item.flower.categories.name_en
                        : item.flower.categories.name_ar}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "#F5958D",
                        fontSize: "1.5vw",
                        fontWeight: "600",
                        margin: "0.5rem 0",
                        "&:hover": { background: "none" },
                      }}
                      className="AddDialogProductDeliveryInfoTextSize"
                    >
                      {t("description.DeliveryInfo")}
                      {item.status === "pending" && (
                        <EditProductDialog item={item} />
                      )}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      gridRowStart: "2",
                      gridColumnStart: "1",
                      gridColumnEnd: "2",
                    }}
                    className="cartPageDeliveryContentBoxContainer"
                  >
                    <Typography
                      sx={{
                        color: "#3A6A8F",
                        fontSize: "1vw",
                        fontWeight: "600",
                      }}
                      className="AddDialogProductCategoryTextSize"
                    >
                      <span
                        style={{ fontWeight: "800" }}
                        className="AddDialogProductCategorySpanTextSize"
                      >
                        {t("description.DeliveryDateCart")} :{" "}
                      </span>
                      {item.delivery_date}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#3A6A8F",
                        fontSize: "1vw",
                        fontWeight: "600",
                      }}
                      className="AddDialogProductCategoryTextSize"
                    >
                      <span
                        style={{ fontWeight: "800" }}
                        className="AddDialogProductCategorySpanTextSize"
                      >
                        {t("description.DeliveryTime")} :{" "}
                      </span>
                      {item.delivery_time}
                    </Typography>
                    {item.delivery_location !== null && (
                      <Typography
                        sx={{
                          color: "#3A6A8F",
                          fontSize: "1vw",
                          fontWeight: "600",
                        }}
                        className="AddDialogProductCategoryTextSize"
                      >
                        <span
                          style={{ fontWeight: "800" }}
                          className="AddDialogProductCategorySpanTextSize"
                        >
                          {t("description.DeliveryLocation")} :{" "}
                        </span>

                        {item.delivery_location}
                      </Typography>
                    )}

                    {item.note !== null && (
                      <Typography
                        sx={{
                          color: "#3A6A8F",
                          fontSize: "1vw",
                          fontWeight: "600",
                        }}
                        className="AddDialogProductCategoryTextSize"
                      >
                        <span
                          style={{ fontWeight: "800" }}
                          className="AddDialogProductCategorySpanTextSize"
                        >
                          {t("description.note")} :{" "}
                        </span>
                        {item.note}
                      </Typography>
                    )}

                    <Typography
                      sx={{
                        color: "#3A6A8F",
                        fontSize: "1vw",
                        fontWeight: "600",
                      }}
                      className="AddDialogProductCategoryTextSize"
                    >
                      <span
                        style={{ fontWeight: "800" }}
                        className="AddDialogProductCategorySpanTextSize"
                      >
                        {t("description.DeliveryType")} :{" "}
                      </span>
                      {i18n.dir() === "ltr"
                        ? item.delivery_type === "delivery"
                          ? "delivery"
                          : "Pick Up"
                        : item.delivery_type === "delivery"
                        ? "توصيل"
                        : "استلام باليد"}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#3A6A8F",
                        fontSize: "1vw",
                        fontWeight: "600",
                      }}
                      className="AddDialogProductCategoryTextSize"
                    >
                      <span
                        style={{ fontWeight: "800" }}
                        className="AddDialogProductCategorySpanTextSize"
                      >
                        {t("description.payment_method")} :{" "}
                      </span>
                      {i18n.dir() === "ltr"
                        ? item.payment_method === "CASH"
                          ? "CASH"
                          : "Online Payment"
                        : item.payment_method === "OnlinePayment"
                        ? "دفع ألكتروني"
                        : "كاش"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      gridRowStart: "2",
                      gridColumnStart: "2",
                      gridColumnEnd: "3",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent:
                        item.special_message !== null
                          ? "space-between"
                          : "flex-end",
                    }}
                    className="cartPageDeliveryContentBoxContainer2"
                  >
                    {item.special_message !== null && (
                      <Typography
                        sx={{
                          color: "#3A6A8F",
                          fontSize: "1vw",
                          fontWeight: "600",
                        }}
                        className="AddDialogProductCategoryTextSize"
                      >
                        <span
                          style={{ fontWeight: "800" }}
                          className="AddDialogProductCategorySpanTextSize"
                        >
                          {t("description.SpecialMessage")} :{" "}
                        </span>
                        {item.special_message}
                      </Typography>
                    )}

                    {item.status === "pending" && (
                      <Box
                        sx={{
                          alignSelf: "end",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <RemoveProductDialog
                          arName={item.flower.nameAR}
                          enName={item.flower.nameEN}
                          id={item.id}
                        />
                        {item.payment_method === "CASH" ? (
                          ""
                        ) : (
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
                              value={item.id}
                            />

                            <input
                              type="hidden"
                              name="WEBSITE"
                              id="WEBSITE"
                              value="WEBSITE"
                            />
                            <input
                              type="hidden"
                              name="TXN_AMOUNT"
                              id="TXN_AMOUNT"
                              value={item.total_price}
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

                            <input
                              type="hidden"
                              name="VERSION"
                              id="VERSION"
                              value="1.1"
                            />

                            <input
                              type="hidden"
                              name="CALLBACK_URL"
                              id="CALLBACK_URL"
                              value="CALLBACK_URL"
                            />

                            <input
                              type="hidden"
                              name="productdetail[0][order_id]"
                              value={item.id}
                            />
                            {/*  <input
                         type="hidden"
                         name="productdetail[0][itemname]"
                         value={nameEn}
                       /> */}

                            <input
                              type="hidden"
                              name="productdetail[0][amount]"
                              value={item.total_price}
                            />
                            <input
                              type="hidden"
                              name="productdetail[0][quantity]"
                              value={item.amount}
                            />

                            {/* <input
                         type="hidden"
                         name="productdetail[0][type]"
                         value="line_item"
                       /> */}
                            {/*   <input
                              type="hidden"
                              name="checksumhash"
                              value={""}
                            /> */}
                            <input
                              type="hidden"
                              name="secret_key"
                              value={"secret_key"}
                            />
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
                        )}
                      </Box>
                    )}
                    {item.status === "checked_out" && (
                      <Box
                        sx={{
                          alignSelf: "end",
                          display: "flex",
                          alignItems: "center",
                          color: "#3A6A8F",
                          fontWeight: "700",
                        }}
                      >
                        <img
                          src={checkedOut}
                          alt="checked-out"
                          style={{
                            margin:
                              i18n.dir() === "ltr"
                                ? " 0 1rem 0 0"
                                : "0 0 0 1rem",
                          }}
                        />

                        {item.delivery_type === "PickUp"
                          ? t("description.PaymentCompleted")
                          : t("description.RequestCompleted")}
                      </Box>
                    )}
                    {item.status === "delivered" && (
                      <Box
                        sx={{
                          alignSelf: "end",
                          display: "flex",
                          alignItems: "center",
                          color: "#3A6A8F",
                          fontWeight: "700",
                        }}
                      >
                        <img
                          src={checkedOut}
                          alt="checked-out"
                          style={{
                            margin:
                              i18n.dir() === "ltr"
                                ? " 0 1rem 0 0"
                                : "0 0 0 1rem",
                          }}
                        />

                        {t("description.Delivered")}
                      </Box>
                    )}
                  </Box>
                </Box>
                <Typography
                  sx={{
                    position: "absolute",

                    right: i18n.dir() === "ltr" ? "10%" : " ",
                    left: i18n.dir() === "ltr" ? " " : "10%",
                    background: "#3A6A8F",
                    boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.03) ",
                    borderRadius: " 0 0 42px 42px ",
                    fontWeight: 700,
                    color: "#ffffff",
                    padding: "1rem 2rem",
                    fontSize: "2vw",
                  }}
                  className="AddDialogPrice"
                >
                  {item.total_price} {t("description.QAR")}
                </Typography>
              </Box>
            ))
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Cart;
