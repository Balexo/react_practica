import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";

function initializeApp() {
  const accessToken = storage.get("auth");

  if (accessToken) {
    setAuthorizationHeader(accessToken);
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App isDefaultLogged={!!accessToken} />
    </React.StrictMode>,
  );
}

initializeApp();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
