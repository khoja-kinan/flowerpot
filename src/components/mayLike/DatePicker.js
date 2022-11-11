import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useTranslation } from "react-i18next";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import InputAdornment from "@mui/material/InputAdornment";
const DatePicker = ({ setDateAndTime }) => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = React.useState("");
  const handleChange = (newValue) => {
    setValue(newValue);

    var hours = newValue.getHours();
    var minutes = newValue.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    let temp =
      newValue.getDate() +
      "-" +
      (newValue.getMonth() + 1) +
      "-" +
      newValue.getFullYear() +
      " " +
      strTime;

    setDateAndTime(temp);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={7}>
        <MobileDateTimePicker
          disablePast
          value={value}
          inputFormat="yyyy/MM/dd hh:mm a"
          mask="___/__/__ __:__ _M"
          onChange={handleChange}
          renderInput={(props) => (
            <TextField
              sx={{
                "& .MuiFilledInput-root": {
                  borderRadius: "8px",
                },
                "& .MuiFilledInput-root:before": {
                  borderBottom: "0",
                },
                "& .MuiFilledInput-root:after": {
                  borderBottom: "0",
                },
                "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                  borderBottom: "0",
                },
                svg: {
                  color: "#F5958D",
                },
                input: {
                  borderRadius: "8px",
                  color: "rgba(58, 106, 143, 0.74)",
                  fontWeight: "600",
                  backgroundColor: "#F3F3F3",
                  textAlign: i18n.dir() === "ltr" ? "left" : "right",
                },

                direction: "ltr",
              }}
              variant="filled"
              {...props}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarMonthIcon sx={{ color: "#F5958D" }} />
                  </InputAdornment>
                ),
                placeholder: t("description.DeliveryDate"),
              }}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DatePicker;
