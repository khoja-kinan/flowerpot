import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const MobilePayment = () => {
  const { t } = useTranslation();
  const [orderid, setOrderid] = useSearchParams();
  const [amount, setamount] = useSearchParams();
  const [email, setemail] = useSearchParams();
  const [mobile, setmobile] = useSearchParams();
  const [quantity, setquantity] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    document.getElementById("sadad_payment_form").submit();
  };
  return (
    <form
      action="https://sadadqa.com/webpurchase"
      method="post"
      id="sadad_payment_form"
      name="gosadad"
      style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}
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
        value={orderid.get("orderid")}
      />
      <input type="hidden" name="WEBSITE" id="WEBSITE" value="WEBSITE" />
      <input
        type="hidden"
        name="TXN_AMOUNT"
        id="TXN_AMOUNT"
        value={amount.get("amount")}
      />
      <input type="hidden" name="EMAIL" id="EMAIL" value={email.get("email")} />
      <input
        type="hidden"
        name="MOBILE_NO"
        id="MOBILE_NO"
        value={mobile.get("mobile")}
      />
      <input
        type="hidden"
        name="SADAD_WEBCHECKOUT_PAGE_LANGUAGE"
        id="SADAD_WEBCHECKOUT_PAGE_LANGUAGE"
        value="ENG"
      />
      <input type="hidden" name="VERSION" id="VERSION" value="1.1" />
      <input
        type="hidden"
        name="CALLBACK_URL"
        id="CALLBACK_URL"
        value="CALLBACK_URL"
      />
      <input
        type="hidden"
        name="productdetail[0][order_id]"
        value={orderid.get("orderid")}
      />
      <input
        type="hidden"
        name="productdetail[0][amount]"
        value={amount.get("amount")}
      />
      <input
        type="hidden"
        name="productdetail[0][quantity]"
        value={quantity.get("quantity")}
      />
      <input type="hidden" name="secret_key" value={"soTXMNRMcC2b3tJp"} />
      <script type="text/javascript">document.gosadad.submit();</script>

      <LoadingButton
        loading={loading}
        onClick={handleSubmit}
        sx={{
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
        {t("description.goToSadad")}
      </LoadingButton>
    </form>
  );
};

export default MobilePayment;
