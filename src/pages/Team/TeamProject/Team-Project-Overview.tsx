import { no_data } from "@/assets";
import { Button } from "@components/custom/Button";
import { Input } from "@components/custom/Input";
import { ProjectCard } from "@components/project/ProjectCard";
import { useTeamProjects } from "@hooks/project/team-project/useTeamProjects";
import { useInfiniteScroll } from "@hooks/useInfiniteScroll";
import { FC, useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

export const TeamProjectOverview: FC = () => {
  const { team_id } = useParams();
  const {
    teamProjectsQuery: { data: projects },
    fetchMoreDataMutation,
    QUERY_KEY,
  } = useTeamProjects(team_id!);

  const {
    searchInputChangeHandler,
    setHasMore,
    increasePage,
    hasMore,
    searchInputRef,
  } = useInfiniteScroll(QUERY_KEY, fetchMoreDataMutation);

  useEffect(() => {
    if (projects?.length === 0) {
      setHasMore(false);
    }
    console.log(projects);
  }, [projects]);

  return (
    <div className="text-light_mode_text dark:text-white px-16 py-8 font-poppins">
      <div className="flex md:flex-row flex-col justify-between mb-5">
        <h4 className="font-semibold text-2xl">Team Project Overview</h4>
        <div className="flex gap-2">
          <Input
            ref={searchInputRef}
            onChange={searchInputChangeHandler}
            label="Search"
            radius="lg"
            color="searchBar"
            placeholder="Type to search..."
            startContent={
              <RiSearchLine className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 rotate-90" />
            }
          />
          <div className="flex items-end">
            <Link to="new">
              <Button>New Project</Button>
            </Link>
          </div>
        </div>
      </div>

      {projects?.length === 0 && (
        <div className="flex justify-center">
          <img className="w-[700px]" src={no_data} />
        </div>
      )}

      {projects?.length && (
        <div
        id="scrollableDiv"
        className="bg-light_mode_secondary dark:bg-hash_one rounded-xl p-8 flex overflow-y-scroll max-h-[800px] no-scrollbar "
        >
          <InfiniteScroll
            dataLength={projects.length}
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
              {projects?.map((project) => (
                <ProjectCard
                  project_id={project.team_project_id}
                  project_name={project.project_name}
                  project_desc={project.project_desc}
                  project_start_date={project.project_start_date}
                  project_end_date={project.project_end_date}
                />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};
