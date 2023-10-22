import styles from "@/style";
import { FC } from "react";
import { BarLoader } from "react-spinners";

export const Loading: FC = () => {
  return (
    <div
      className={`z-[99999999] fixed w-full h-full left-0 top-0 ${styles.flexCenter}  bg-black bg-opacity-50`}
    >
      <BarLoader color="white" width="200" height="3" />
    </div>
  );
};
