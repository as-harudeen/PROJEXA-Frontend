import { FC } from "react";
import styles from "../../style";
import { Button } from "./Button";
import { NavProps } from "./props";

export const Nav: FC<NavProps> = ({actived}) => {
  return (
    <nav className="w-full bg-primary flex justify-center">
      <div className={`bg-primary ${styles.boxWidth} flex justify-between items-center px-6 md:px-16 py-3 md:py-6`}>
        <div>
          <h2 className="text-secondary font-extrabold font-poppins text-xl">PROJEXA</h2>
        </div>
        <div className="flex gap-2">
          <Button isLoginButton={false} styles={`${actived === 'register'? "opacity-50": ""}`}/>
          <Button isLoginButton={true} styles={`${actived === 'login'? "opacity-50": ""}`}/>
        </div>
      </div>
    </nav>
  );
};
