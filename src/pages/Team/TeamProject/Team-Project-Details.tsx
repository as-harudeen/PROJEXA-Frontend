import { useTeamProjectDetails } from "@hooks/project/team-project/useTeamProjectDetails";
import { FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { Button } from "@nextui-org/react";
import { EditProject } from "@pages/Personal-Project/EditProject";

export const TeamProjectDetails: FC = () => {
  const { team_id, project_id } = useParams();
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const {
    teamProjectDetailsQuery: { data: project },
  } = useTeamProjectDetails(team_id!, project_id!);
  return (
    <>
      {project != null && (
        <>
          <div className="px-16 py-12 text-white font-poppins">
            <div className="flex justify-between">
              <h2 className="font-poppins text-2xl font-semibold mb-3">
                {project.project_name}
              </h2>
              <p className="font-medium text-lg">{project.project_status}</p>
            </div>

            <div>
              <p className="mb-3">{project.project_desc}</p>
              <p className="font-medium">
                Start Date :-{" "}
                <span>
                  {moment(project.project_start_date).format("DD-MM-YY")}
                </span>
              </p>
              <p className="font-medium">
                End Date :-{" "}
                <span>
                  {moment(project.project_end_date).format("DD-MM-YY")}
                </span>
              </p>
            </div>
            <div className="mt-5">
              <h4 className="text-xl font-medium">Project References</h4>

              <div className="w-full bg-hash_one flex rounded-md mt-6 flex-wrap">
                {project.project_reference.map((item) => (
                  <div
                    onClick={() => window.open(item.link)}
                    className="px-10 py-6"
                  >
                    <span className="hover:bg-hash_two px-4 py-2 hover:rounded-md border-b-1 border-white cursor-pointer">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>

              <div className="py-16 flex gap-3">
                <Button onClick={() => setIsEditModeOn(true)}>Edit</Button>
                <Link to="space">
                  <Button>Space</Button>
                </Link>
                <Link to="task-distribution">
                  <Button>Task distribution center</Button>
                </Link>
              </div>
            </div>
          </div>
          {isEditModeOn && (
            <EditProject toggleEditMode={setIsEditModeOn} {...project} />
          )}
        </>
      )}
    </>
  );
};
