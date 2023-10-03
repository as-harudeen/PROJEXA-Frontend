import { Login } from "./pages/Auth/Login";
import { Routes, Route } from "react-router-dom";
import { Register } from "./pages/Auth/Register";
import { Auth } from "./components/auth/Auth";
import { FadeLoader } from "react-spinners";
import "./App.css";
import { useAppSelector } from "./hooks/storeHooks";

export const App = () => {
  const isLoading = useAppSelector((state) => state.loading);
  return (
    <>
      {isLoading && (
        <div className={"parentDisable"}>
          <div className="overlay-box">
            <FadeLoader color={"white"} />
          </div>
        </div>
      )}
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};
