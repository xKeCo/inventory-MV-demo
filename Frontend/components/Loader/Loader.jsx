// Chakra UI
import { Spinner } from "@chakra-ui/react";

// Styles
import s from "./Loader.module.css";

function Loader() {
  return (
    <div className={s.loader__Container}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </div>
  );
}

export default Loader;
