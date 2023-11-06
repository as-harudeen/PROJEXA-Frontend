import { NewProject } from "@pages/Personal-Project/NewProject";
import { FC } from "react";
import { CreateProjectDataInterface } from "@/interfaces/project/personal/newProject.interface";
import { postRequest } from "@/helper/api.helper"
import { useParams } from "react-router-dom";

export const NewTeamProject: FC = () => {

    const { team_id } = useParams();

  const createTeamProjectHandler = async (
    data: CreateProjectDataInterface
  ) => {
    await postRequest(`/team/${team_id}/projects/new`,data);
  };

  return (
    <div>
      <NewProject createProjectHandler={createTeamProjectHandler}/>
    </div>
  );
};
