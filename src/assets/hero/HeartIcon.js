import * as React from "react";
import { SvgIcon as MuiSvgIcon, styled } from "@mui/material";

const SvgIcon = styled(MuiSvgIcon, {
  name: "HeartIcon",
  shouldForwardProp: (prop) => prop !== "fill",
})(() => ({
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "2.25px",
}));

SvgIcon.defaultProps = {
  viewBox: "0 0 24 24",
  focusable: "false",
  "aria-hidden": "true",
};

const HeartIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        id="Stroke 1"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.87187 11.5983C1.79887 8.24832 3.05287 4.41932 6.56987 3.28632C8.41987 2.68932 10.4619 3.04132 11.9999 4.19832C13.4549 3.07332 15.5719 2.69332 17.4199 3.28632C20.9369 4.41932 22.1989 8.24832 21.1269 11.5983C19.4569 16.9083 11.9999 20.9983 11.9999 20.9983C11.9999 20.9983 4.59787 16.9703 2.87187 11.5983Z"
        stroke="#3A6A8F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Stroke 3"
        d="M16 6.7002C17.07 7.0462 17.826 8.0012 17.917 9.1222"
        stroke="#3A6A8F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default HeartIcon;
