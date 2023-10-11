import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "@/style";

export const Nav: FC = () => {
  const location = useLocation();
  return (
    <nav className="w-full bg-primary flex justify-center">
      <div
        className={`bg-primary ${styles.boxWidth} flex justify-between items-center px-6 md:px-16 py-3 md:py-6`}
      >
        <div>
          <h2 className="text-secondary font-extrabold font-poppins text-xl">
            PROJEXA
          </h2>
        </div>
        <div className="flex gap-2">
          <Link to="/auth/login">
            <p
              className={`font-poppins text-white ${
                location.pathname === "/auth/login"
                  ? "underline underline-offset-2 "
                  : "opacity-50"
              }`}
            >
              Login
            </p>
          </Link>
          <Link to="/auth/register">
            <p
              className={`font-poppins text-white ${
                location.pathname === "/auth/register"
                  ? "underline underline-offset-2"
                  : "opacity-50"
              }`}
            >
              Register
            </p>
          </Link>
        </div>
      </div>
    </nav>
  );
};
