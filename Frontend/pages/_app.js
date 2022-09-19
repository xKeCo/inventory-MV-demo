import "../styles/globals.css";
import {
  ChakraProvider,
  // , ColorModeScript
} from "@chakra-ui/react";
import theme from "../theme/theme";

import { AuthProvider } from "../context/AuthProvider.jsx";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
