import { no_data } from "@/assets";
import { IoReloadSharp } from "react-icons/io5";
import { FC } from "react";
import { InvitationInbox } from "@components/team/InvitationInbox";
import InfiniteScroll from "react-infinite-scroll-component";
import { MoonLoader } from "react-spinners";
import { RiSearchLine } from "react-icons/ri";
import { Input } from "@components/custom/Input";
import { Loading } from "@components/project/Loading";
import { TeamInterface, useTeam } from "@hooks/team/useTeams";
import { useInfiniteScroll } from "@hooks/useInfiniteScroll";
import { TeamCard } from "@components/project/team/TeamCard";

export const TeamOverview: FC = () => {
  const {
    teamQuery: { data, isLoading },
    fetchMoreDataMutation,
    QUERY_KEY,
  } = useTeam();

  const { searchInputChangeHandler, increasePage, hasMore, searchInputRef } =
    useInfiniteScroll<TeamInterface>(QUERY_KEY, fetchMoreDataMutation);

  // const s = useUrlQuery();

  // console.log(s.get('s'));

  const generateRandom = () => {
    let key = "";
    for (let i = 0; i < 20; i++) {
      key += Math.floor(Math.random() * 9);
    }
    return key;
  };
  return (
    <div className="text-light_mode_text dark:text-white px-16 py-12 flex flex-col gap-5">
      {isLoading && <Loading />}
      <div className="flex justify-between">
        <h3 className="font-semibold text-2xl mb-5">Team-Overview</h3>
        <div className="pe-5 cursor-pointer">
          <InvitationInbox />
        </div>
      </div>
      <Input
        ref={searchInputRef}
        onChange={searchInputChangeHandler}
        label="Search"
        radius="lg"
        color="hash"
        classNames={{
          inputWrapper: [
            "shadow-xl",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "!cursor-text",
          ],
        }}
        placeholder="Type to search..."
        startContent={
          <RiSearchLine className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 rotate-90" />
        }
      />

      {data?.length === 0 && (
        <div className="flex justify-center">
          <img className="w-[700px]" src={no_data} />
        </div>
      )}

      {data?.length && (
        <div
          id="scrollableDiv"
          className="relative px-8 no-scrollbar py-8 w-full h-[800px] bg-light_mode_secondary dark:bg-hash_one rounded-md overflow-y-scroll"
        >
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
            <div className="flex flex-wrap gap-3 justify-center my-8">
              {data.map((team) => (
                <TeamCard key={generateRandom()} {...team} />
              ))}
            </div>
          </InfiniteScroll>
          {hasMore && (
            <div className="fixed bottom-[10%] right-[9%] bg-light_mode_hard dark:bg-black p-2 rounded-xl">
              <IoReloadSharp size="28" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
