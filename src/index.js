import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import InvoiceContextProvider from "./Contexts/InvoiceContext";
import AddItemContextProvider from "./Contexts/AddItemcontext";

ReactDOM.render(
  <ChakraProvider>
    <InvoiceContextProvider>
      <AddItemContextProvider>
        <App />
      </AddItemContextProvider>
    </InvoiceContextProvider>
  </ChakraProvider>,
  document.getElementById("root")
);
