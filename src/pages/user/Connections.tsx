import { useEffect, useState } from "react";
import { noProfileImg } from "@/assets";
import { Input } from "@nextui-org/react";
import { FC } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/helper/api.helper";
import { Loading } from "@components/project/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

type GETgetAllUsersResponseType = {
  user_name: string;
  user_profile: string;
}[];

interface UserCardProps {
  user_name: string;
  user_profile?: string;
}

export const UserCard = ({ user_name, user_profile }: UserCardProps) => (
  <div className="px-4 py-2 flex justify-between items-center w-[300px] h-[80px] bg-hash_two rounded-xl">
    <Link to={`/${user_name}`}>
      <div className="flex-1 flex items-center gap-3">
        <img
          className="w-[50px] h-[50px] object-cover rounded-full"
          src={
            user_profile
              ? `${import.meta.env.VITE_BASE_URL}/${user_profile}`
              : noProfileImg
          }
          alt=""
        />
        <div>
          <h6 className="font-medium">{user_name}</h6>
        </div>
      </div>
    </Link>
  </div>
);

export const Connections: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await getRequest<GETgetAllUsersResponseType>(
        "user/get-all-users"
      );
      console.log(response.data);
      return response.data;
    },
  });
  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [isError]);
  return (
    <div className="px-16 py-8 text-white font-poppins">
      {isLoading && <Loading />}
      <div className="flex justify-between">
        <div>
          <h2 className="font-semibold text-xl">Connections</h2>
        </div>
        <div className="flex">
          <Input
            value={searchValue}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setSearchValue(value);
            }}
            label="Search"
            radius="lg"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search..."
            startContent={
              <RiSearchLine className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 rotate-90" />
            }
          />
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-5 pt-10">
        {data &&
          data.map((user) => (
            <UserCard
              key={user.user_name}
              user_name={user.user_name}
              user_profile={user.user_profile}
            />
          ))}
      </div>
    </div>
  );
};
