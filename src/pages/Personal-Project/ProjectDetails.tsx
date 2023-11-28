import { FC, useState } from "react";
import { Button } from "../../components/custom/Button";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { EditProject } from "./EditProject";
import { UpdateProjectStatusModal } from "@components/project/UpdateProjectStatusModal";
import { Loading } from "@components/project/Loading";
import { usePersonalProjectDetails } from "@hooks/project/personal-project/usePersonalProjectDetails";

export const ProjectDetails: FC = () => {
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const { project_id } = useParams();
  const navigate = useNavigate();

  const {
    personalProjectDetailsQuery: { data: project, error, isLoading },
    updateStatusMutation,
    updateProjectDetails,
  } = usePersonalProjectDetails(project_id!);

  if (error) return <div className="text-white">{error.message}</div>;
  if (isLoading) return <Loading />;

  return (
    <>
      {project != null && (
        <>
          <div className="px-8 md:px-16 py-8 md:py-12 dark:text-white text-light_mode_text font-poppins">
            <div className="flex justify-between">
              <h2 className="font-poppins text-2xl font-semibold mb-3">
                {project.project_name}
              </h2>
              <div className="flex items-center gap-4">
                <p className="font-medium text-lg">{project.project_status}</p>
                <UpdateProjectStatusModal
                  project_id={project.project_id}
                  curr_status={project.project_status}
                  updateStatusMutation={updateStatusMutation}
                />
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

              <div className="py-16 flex gap-3">
                <Button onClick={() => setIsEditModeOn(true)}>Edit</Button>
                <Button onClick={() => navigate("space")}>Space</Button>
              </div>
            </div>
          </div>
          {isEditModeOn && (
            <EditProject
              updateState={updateProjectDetails}
              submitUrl={`project/personal/${project_id}`}
              toggleEditMode={setIsEditModeOn}
              {...project}
            />
          )}
        </>
      )}
    </>
  );
};
