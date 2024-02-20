import { NewProject } from "@pages/Personal-Project/NewProject";
import { FC } from "react";
import { CreateProjectDataInterface } from "@/interfaces/project";
import { useParams } from "react-router-dom";
import { useFetch } from "@hooks/useFetch";

export const NewTeamProject: FC = () => {

    const { team_id } = useParams();
    const {postRequest} = useFetch();

  const createTeamProjectHandler = async (
    data: CreateProjectDataInterface
  ) => {
    await postRequest(`team/projects/${team_id}/new`,data);
  };

  return (
    <div>
      <NewProject createProjectHandler={createTeamProjectHandler}/>
    </div>
  );
};
