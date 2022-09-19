import { extendTheme } from "@chakra-ui/react";

const theme = {
  styles: {
    global: {
      html: {
        margin: 0,
        fontFamily: "Inter, sans-serif",
      },
      body: {
        padding: 0,
        margin: 0,
        fontFamily: "Inter, sans-serif",
        boxSizing: "border-box",
      },
    },
  },
};

export default extendTheme(theme);
