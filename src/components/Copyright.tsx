import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";

export default function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MuiLink color="inherit" href="http://www.vision-tek.co.kr/">
        VisionTech
      </MuiLink>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}