import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        P.S.
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
