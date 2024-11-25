import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { SWRConfig } from "swr";
import { fetcher } from "./libs/utils/api";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider>
      <Notifications position="top-right" />
      <SWRConfig value={{ refreshInterval: 0, fetcher: fetcher }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SWRConfig>
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
