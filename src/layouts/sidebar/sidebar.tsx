import { FC } from "react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { MdMenuOpen } from "react-icons/md";
import { useAppDispatch } from "../../hooks/storeHooks";
import "./sidebar.css";
import { closeSideBar } from "../../store/slice/sideBarSlice";

export const SideBar: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div
      className={`relative h-screen min-h-[400px] transition-all duration-300 w-[200px] sm:w-[260px] m-0 lg:block felx flex-col bg-hash_two rounded-s-md sm:rounded-lg`}
    >
      <MdMenuOpen
        onClick={() => dispatch(closeSideBar())}
        className="text-white absolute top-[50%] right-[-12px] translate-y-[-50%] cursor-pointer rotate-90"
        size="28"
      />
      <div className="flex-1 h-full flex flex-col justify-between sm:gap-2 px-[10px] sm:px-[16px] sm:py-[12px]">
        <h1 className="text-white font-semibold font-poppins text-center text-xl sm:text-2xl my-2 sm:my-5">
          PROJEXA
        </h1>
        <div className="flex-1 flex flex-col w-full">
          <SideBarIcon title="Personal Project" />
          <SideBarIcon title="Team Project" />
          <SideBarIcon title="Company Project" />
        </div>
        <div>
          <SideBarIcon title="Settings" icon={<FiSettings size="18" />} />
          <SideBarIcon title="Logout" icon={<FiLogOut size="18" />} />
        </div>
      </div>
    </div>
  );
};

interface SideBarIconProps {
  icon?: React.ReactNode;
  title: string;
}

const SideBarIcon: FC<SideBarIconProps> = ({ icon, title }) => (
  <div className="sidebar-icon group">
    <div className="flex-1 flex justify-between items-center">
      <span className="font-nunito font-medium sm:font-bold text-[12px] sm:text-[13px]">{title}</span>
      {icon && icon}
    </div>
    {/* <span className="sidebar-tooltip group-hover:scale-100">{text}</span> */}
  </div>
);
