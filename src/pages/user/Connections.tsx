import { useEffect } from "react";
import { noProfileImg } from "@/assets";
import { Input } from "@nextui-org/react";
import { FC } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Loading } from "@components/project/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useUsers } from "@hooks/useUsers";
import InfiniteScroll from "react-infinite-scroll-component";
import { MoonLoader } from "react-spinners";
import { useInfiniteScroll } from "@hooks/useInfiniteScroll";

interface UserCardProps {
  user_name: string;
  user_profile?: string;
}

export const UserCard = ({ user_name, user_profile }: UserCardProps) => (
  <div className="px-4 py-2 flex justify-between items-center w-full min-w-[300px] md:h-[80px] sm:[h-70px] bg-light_mode_hard dark:bg-hash_two rounded-xl">
    <Link to={`/${user_name}`}>
      <div className="flex-1 flex items-center gap-3">
        <img
          className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-cover rounded-full"
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
  const {
    usersQery: { data, isLoading, isError, error },
    fetchMoreDataMutation,
  } = useUsers();

  const { hasMore, searchInputChangeHandler, searchInputRef, increasePage } =
    useInfiniteScroll(["users"], fetchMoreDataMutation);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [isError]);
  return (
    <div className="px-16 py-8 text-white font-poppins flex flex-col gap-10">
      {isLoading && <Loading />}
      <div className="flex justify-between md:flex-row flex-col">
        <div>
          <h2 className="font-semibold text-xl">Connections</h2>
        </div>
        <div className="flex">
          <Input
            ref={searchInputRef}
            onChange={searchInputChangeHandler}
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
      {data && (
        <div id="scrollabelDiv" className="pt-10 h-[600px] overflow-y-scroll no-scrollbar ">
          <InfiniteScroll
            dataLength={data.length}
            next={increasePage}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center py-20 ">
                <MoonLoader color="white" />
              </div>
            }
            scrollableTarget="scrollableDiv"
          >
            <div className="w-full flex flex-wrap gap-3">
              {data.map((user) => (
                <UserCard
                  key={user.user_name}
                  user_name={user.user_name}
                  user_profile={user.user_profile}
                  
                />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};
