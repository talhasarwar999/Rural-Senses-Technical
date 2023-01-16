import React from "react";
import ReactDOM from "react-dom/client";
//COMPONENTS
import App from "./App";
//REDUX
import { Provider } from "react-redux";
import store from "./redux/store";
//Snackbar
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <App />
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>
);
