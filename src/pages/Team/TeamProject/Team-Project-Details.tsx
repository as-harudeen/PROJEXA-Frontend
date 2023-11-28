import { useTeamProjectDetails } from "@hooks/project/team-project/useTeamProjectDetails";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { CircularProgress } from "@nextui-org/react";
import { EditProject } from "@pages/Personal-Project/EditProject";
import { Button } from "@components/custom/Button";
import { Loading } from "@components/project/Loading";
import { UpdateProjectStatusModal } from "@components/project/UpdateProjectStatusModal";

export const TeamProjectDetails: FC = () => {
  const { team_id, project_id } = useParams();
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const {
    teamProjectDetailsQuery: { data: project, isLoading },
    updateStatusMutation,
    updateProjectDetails,
  } = useTeamProjectDetails(team_id!, project_id!);

  console.log(project);

  const navigate = useNavigate();
  if (isLoading) return <Loading />;
  return (
    <>
      {project != null && (
        <>
          <div className="md:px-16 sm:px-8 px-6 py-12 text-light_mode_text dark:text-white font-poppins">
            <div className="flex justify-between">
              <h2 className="font-poppins text-2xl font-semibold mb-3">
                {project.project_name}
              </h2>
              <div className="flex items-center gap-4">
                <p className="font-medium text-lg">{project.project_status}</p>
                {project.isCurrentUserLeader && (
                  <UpdateProjectStatusModal
                    project_id={project.team_project_id}
                    curr_status={project.project_status}
                    updateStatusMutation={updateStatusMutation}
                  />
                )}
              </div>
            </div>

            <div className="min-h-[200px] flex flex-col justify-between gap-5">
              <p>{project.project_desc}</p>
              <div>
                <p className="font-medium">
                  Start Date :{" "}
                  <span>
                    {moment(project.project_start_date).format("DD-MM-YY")}
                  </span>
                </p>
                <p className="font-medium">
                  End Date :{" "}
                  <span>
                    {moment(project.project_end_date).format("DD-MM-YY")}
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-5">
              <h4 className="text-xl font-medium">Project References</h4>

              <div className="w-full bg-light_mode_secondary dark:bg-hash_one flex rounded-md mt-6 flex-wrap shadow-sm">
                {project.project_reference.map((item) => (
                  <div
                    onClick={() => window.open(item.link)}
                    className="px-10 py-6"
                  >
                    <span className="hover:bg-light_mode_hard dark:hover:bg-hash_two px-4 py-2 hover:rounded-md border-b-1 border-light_mode_text dark:border-white cursor-pointer">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>

              <div className="py-10">
                <div>
                  <h3 className="font-semibold text-lg">
                    Task completed percentage
                  </h3>
                </div>
                <div className="flex flex-col sm:flex-row py-10">
                  <div>
                    <CircularProgress
                      value={project.completedTaskPercentage}
                      color="warning"
                      showValueLabel={true}
                      classNames={{
                        svg: "w-32 sm:w-40 md:w-48 h-48 drop-shadow-md",
                        track: "dark:stroke-white/10",
                        value: "text-xl sm:text-2xl md:text-3xl font-semibold ",
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center">
                      {Object.keys(project.tasks).map((key) => (
                        <div className="flex flex-col items-center">
                          <h3 className="font-semibold ">{key}</h3>
                          <CircularProgress
                            value={
                              (100 *
                                project.tasks[key as keyof typeof project.tasks]
                                  .done.length) /
                              (project.tasks[key as keyof typeof project.tasks]
                                .done.length +
                                project.tasks[key as keyof typeof project.tasks]
                                  .todo.length +
                                project.tasks[key as keyof typeof project.tasks]
                                  .doing.length)
                            }
                            size="lg"
                            color="warning"
                            showValueLabel={true}
                            classNames={{
                              svg: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-md",
                              track: "dark:stroke-white/10",
                              value:
                                "text-sm sm:text-md md:text-lg font-semibold ",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-16 flex flex-col sm:flex-row gap-3">
                <Button onClick={() => setIsEditModeOn(true)}>Edit</Button>
                <Button onClick={() => navigate("space")} className="w-full">
                  Space
                </Button>
                {project.isCurrentUserLeader && (
                  <Button
                    onClick={() => navigate("task-distribution")}
                    className="w-full"
                  >
                    Task distribution center
                  </Button>
                )}
              </div>
            </div>
          </div>
          {isEditModeOn && (
            <EditProject
              updateState={updateProjectDetails}
              submitUrl={`team/projects/project/${project_id}`}
              toggleEditMode={setIsEditModeOn}
              {...project}
            />
          )}
        </>
      )}
    </>
  );
};
