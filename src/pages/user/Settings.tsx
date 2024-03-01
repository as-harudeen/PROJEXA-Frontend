import { useThemeStore } from "@/store/useThemeStore";
import { useUserStore } from "@/store/useUserStore";
import { Loading } from "@components/project/Loading";
import { useFetch } from "@hooks/useFetch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
} from "@nextui-org/react";
import { FC, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

export const Settings: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { patchRequest } = useFetch();
  const twoFactorAuthToggleHandler = async (isSelected: boolean) => {
    setIsLoading(true);
    const res = await patchRequest(
      `user/two-factor-auth/${isSelected ? "enable" : "disable"}`,
      {}
    );
    setIsLoading(false);

    if (res.status === 200) {
      if (user) updateUser({ ...user, isTwoFacAuthEnabled: isSelected });
    }
  };

  const { isDarkModeEnabled, toggle } = useThemeStore();
  const { user, updateUser } = useUserStore();
  return (
    <div className="text-light_mode_text dark:text-white px-16 py-12">
      {isLoading && <Loading />}
      <div className="sm:mb-10 mb-5">
        <h2 className="font-semibold text-2xl">Settings</h2>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between bg-light_mode_primary dark:bg-white/10 ring-1 ring-white/50 bg-opacity-70 px-8 py-6 rounded-md">
          <div className="flex gap-2 items-cente">
            <h5 className="font-semibold text-large">2-Factor Auth </h5>
            <Popover
              showArrow
              backdrop="opaque"
              placement="right"
              classNames={{
                base: "py-3 px-4 border border-default-200 bg-gradient-to-br from-white to-default-300 dark:from-default-100 dark:to-default-50",
                arrow: "bg-default-200",
              }}
            >
              <PopoverTrigger>
                <span className="cursor-pointer">
                  <AiOutlineInfoCircle size="22" />
                </span>
              </PopoverTrigger>
              <PopoverContent>
                {(titleProps) => (
                  <div className="top-0 px-1 py-2">
                    <h3
                      className="text-medium font-poppins font-bold"
                      {...titleProps}
                    >
                      Two-factor authentication
                    </h3>
                    <div className="text-normal font-poppins max-w-[300px]">
                      Once this is enabled, you will need to enter a one-time
                      password (OTP) in addition to your username and password
                      when logging in. This adds an extra layer of security to
                      your account and helps to protect it from unauthorized
                      access.
                    </div>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Switch
              defaultSelected={user?.isTwoFacAuthEnabled}
              onValueChange={twoFactorAuthToggleHandler}
            />
          </div>
        </div>

        <div className="flex justify-between bg-light_mode_primary dark:bg-white/10 ring-1 ring-white/40 bg-opacity-70 px-8 py-6 rounded-md">
          <div className="flex gap-2 items-cente">
            <h5 className="font-semibold text-large">Dark Mode</h5>
          </div>
          <div>
            <Switch
              defaultSelected={isDarkModeEnabled}
              onValueChange={toggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
