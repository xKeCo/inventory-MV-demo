import "../styles/globals.css";
import {
  ChakraProvider,
  // , ColorModeScript
} from "@chakra-ui/react";
import theme from "../theme/theme";

import { AuthProvider } from "../context/AuthProvider";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "../context/AppProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <AppProvider>
          <Toaster position="bottom-center" reverseOrder={false} />
          {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
          <Component {...pageProps} />
        </AppProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
