import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "@/style";
import { useUserStore } from "@/store/useUserStore";

export const Nav: FC = () => {
  const location = useLocation();
  const { user, updateUser } = useUserStore();

  return (
    <nav className="sticky top-0 md:top-[-20px] w-full shadow-xl flex justify-center bg-light_mode_secondary dark:bg-hash_two z-[1000000]">
      <div
        className={`bg-light_mode_hard dark:bg-primary ${styles.boxWidth} flex justify-between items-center px-6 md:px-16 py-3 md:py-6 md:mt-6 rounded-md ring-1 ring-hash_one shadow-2xl shadow-slate-800` }
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
                      : "opacity-50 hover:opacity-100"
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
                      : "opacity-50 hover:opacity-100"
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
