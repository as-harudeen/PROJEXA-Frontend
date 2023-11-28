import { useSidebarStore } from "@/store/useSidebarStore";
import { FC } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

export const NavBar: FC = () => {
  const toggleSidebar = useSidebarStore(state => state.toggle);
  return (
    <div className="w-full flex justify-center z-[999999999]">
      <nav className="dark:text-white text-light_mode_text fixed sm:top-4 mx-auto bg-light_mode_hard dark:bg-hash_one w-full sm:w-[80%] max-w-[800px] flex justify-between items-center px-10 py-2 sm:rounded-lg">
        <div className="cursor-pointer" onClick={() => toggleSidebar(true)}>
          <GiHamburgerMenu />
        </div>
        <div>
          <Link to="/">
          <h1 className="cursor-pointer font-poppins font-semibold text-xl">PROJEXA</h1>
          </Link>
        </div>
      </nav>
    </div>
  );
};
