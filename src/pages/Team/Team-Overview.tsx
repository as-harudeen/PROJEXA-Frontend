import { no_data } from "@/assets";
import { ChangeEvent, FC, useEffect } from "react";
import { InvitationInbox } from "@components/team/InvitationInbox";
import { MoonLoader } from "react-spinners";
import { RiSearchLine } from "react-icons/ri";
import { Input } from "@components/custom/Input";
import { Loading } from "@components/project/Loading";
import { TeamInterface, useTeam } from "@hooks/team/useTeams";
import { TeamCard } from "@components/project/team/TeamCard";
import { useInView } from "react-intersection-observer";

export const TeamOverview: FC = () => {
  const { ref, inView } = useInView();

  const {
    teamQuery: {
      data,
      isLoading,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    },
    setSearch,
  } = useTeam();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  let time: NodeJS.Timeout;
  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (time) clearTimeout(time);
    const searchVal = e.currentTarget.value;
    time = setTimeout(() => {
      setSearch(searchVal);
    }, 1000);
  };

  return (
    <div className="text-light_mode_text dark:text-white px-16 py-12 flex flex-col gap-5">
      {isLoading && <Loading />}
      <div className="flex justify-between">
        <h3 className="font-semibold text-2xl mb-5">Team-Overview</h3>
        <div className="pe-5 cursor-pointer z-[10]">
          <InvitationInbox />
        </div>
      </div>
      <Input
      onChange={onChangeHandler}
        label="Search"
        radius="lg"
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

      {data?.pages.length === 0 && (
        <div className="flex justify-center">
          <img className="w-[700px]" src={no_data} />
        </div>
      )}

      {data?.pages.length && (
        <div
          id="scrollableDiv"
          className="relative px-8 no-scrollbar py-8 w-full h-[800px] bg-light_mode_secondary dark:bg-white/10 backdrop-blur-md ring-1 ring-white/40 rounded-md overflow-y-scroll"
        >
          <div className="flex flex-wrap gap-3 justify-center my-8">
            {data.pages.map((pages, i) =>
              pages.map((team: TeamInterface, idx: number) => (
                <TeamCard
                  innerRef={
                    data.pages.length - 1 === i && pages.length - 1 === idx
                      ? ref
                      : null
                  }
                  key={team.team_id}
                  {...team}
                />
              ))
            )}
          </div>
          {isFetchingNextPage && (
            <div className="flex justify-center py-20 ">
              <MoonLoader color="white" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

{
}
