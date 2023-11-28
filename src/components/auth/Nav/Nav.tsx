import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "@/style";
import { useUserStore } from "@/store/useUserStore";

export const Nav: FC = () => {
  const location = useLocation();
  const { user, updateUser } = useUserStore();

  return (
    <nav className="w-full bg-light_mode_hard border-b border-light_hash shadow-xl dark:bg-primary flex justify-center">
      <div
        className={`bg-light_mode_hard dark:bg-primary ${styles.boxWidth} flex justify-between items-center px-6 md:px-16 py-3 md:py-6`}
      >
        <div>
          <Link to="/">
            <h2 className="cursor-pointer dark:text-secondary font-extrabold font-poppins text-xl">
              PROJEXA
            </h2>
          </Link>
        </div>
        <div className="flex gap-2">
          {user === null ? (
            <>
              <Link to="/auth/login">
                <p
                  className={`font-poppins dark:text-white ${
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
                  className={`font-poppins dark:text-white ${
                    location.pathname === "/auth/register"
                      ? "underline underline-offset-2"
                      : "opacity-50"
                  }`}
                >
                  Register
                </p>
              </Link>
            </>
          ) : (
            <button onClick={() => updateUser(null)} className="w-full">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
