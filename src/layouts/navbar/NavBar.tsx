import { FC } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAppDispatch } from "../../hooks/storeHooks";
import { openSideBar } from "../../store/slice/sideBarSlice";

export const NavBar: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="w-full flex justify-center">
      <nav className="text-white fixed sm:top-4 mx-auto bg-hash_one w-full sm:w-[80%] max-w-[800px] flex justify-between items-center px-10 py-2 sm:rounded-lg">
        <div className="cursor-pointer" onClick={() => dispatch(openSideBar())}>
          <GiHamburgerMenu />
        </div>
        <div>
          <h1 className="font-poppins font-semibold text-xl">PROJEXA</h1>
        </div>
      </nav>
    </div>
  );
};
