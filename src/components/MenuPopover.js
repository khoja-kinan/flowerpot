import PropTypes from "prop-types";
// material
import { Popover } from "@mui/material";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

MenuPopover.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function MenuPopover({ children, sx, ...other }) {
  return (
    <Popover
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          mt: 1.5,
          ml: 0.5,
          overflow: "inherit",
          border: (theme) => `solid 1px ${theme.palette.grey[500_8]}`,
          width: 300,
          gridTemplateColumns: "1fr 6rem",
          gridAutoColumns: "1fr",
          alignItems: "center",
          columnGap: "1rem",
          ...sx,
        },
      }}
      {...other}
    >
      {children}
    </Popover>
  );
}
