import { no_data } from "@/assets";
import { Button } from "@components/custom/Button";
import { Input } from "@components/custom/Input";
import { ProjectCard } from "@components/project/ProjectCard";
import {
  GETTeamProjectsResponse,
  useTeamProjects,
} from "@hooks/project/team-project/useTeamProjects";
import { ChangeEvent, FC, useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useInView } from "react-intersection-observer";
import { useNavigate, useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

export const TeamProjectOverview: FC = () => {
  const { ref, inView } = useInView();
  const navigate = useNavigate();
  const { team_id } = useParams();
  const {
    teamProjectsQuery: {
      data: projects,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
    },
    setSearch,
  } = useTeamProjects(team_id!);

  useEffect(() => {
    if (inView) {
      console.log("Fetching");
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
    <div className="text-light_mode_text dark:text-white px-16 py-8 font-poppins">
      <div className="flex md:flex-row flex-col justify-between mb-5">
        <h4 className="font-semibold text-2xl">Team Project Overview</h4>
        <div className="flex gap-2">
          <Input
            onChange={onChangeHandler}
            label="Search"
            radius="lg"
            color="searchBar"
            placeholder="Type to search..."
            startContent={
              <RiSearchLine className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 rotate-90" />
            }
          />
          <div className="flex items-end">
            <Button onClick={() => navigate("new")}>New Project</Button>
          </div>
        </div>
      </div>

      {projects?.pages.length === 0 && (
        <div className="flex justify-center">
          <img className="w-[700px]" src={no_data} />
        </div>
      )}

      {projects?.pages.length && (
        <div
          id="scrollableDiv"
          className="bg-light_mode_secondary dark:bg-white/10 ring-1 ring-white/40 rounded-xl p-8 flex overflow-y-scroll max-h-[800px] no-scrollbar "
        >
          <div className="flex flex-wrap gap-3 justify-center my-8">
            {projects?.pages.map((page: GETTeamProjectsResponse, i) =>
              page.map((project, idx) => (
                <ProjectCard
                  key={project.team_project_id}
                  project_id={project.team_project_id}
                  project_name={project.project_name}
                  project_desc={project.project_desc}
                  project_start_date={project.project_start_date}
                  project_end_date={project.project_end_date}
                  innerRef={
                    projects.pages.length - 1 === i && page.length - 1 === idx
                      ? ref
                      : null
                  }
                />
              ))
            )}
          </div>
        </div>
      )}
      {isFetchingNextPage && (
        <div className="flex justify-center py-20 ">
          <MoonLoader color="white" />
        </div>
      )}
    </div>
  );
};
