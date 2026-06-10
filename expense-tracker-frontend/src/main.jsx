import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 👉 1. Import BrowserRouter
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // 👉 2. Wrap the entire app inside the BrowserRouter
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);