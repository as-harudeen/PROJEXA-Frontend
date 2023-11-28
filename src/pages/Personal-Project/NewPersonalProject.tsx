import { FC } from "react";
import { NewProject } from "./NewProject";
import { CreateProjectDataInterface } from "@/interfaces/project";
import { API_POST_CREATE_NEW_PERSONAL_PROJECT } from "@/constants/api.url";
import { useFetch } from "@hooks/useFetch";

export const NewPersonalProject: FC = () => {
  const { postRequest } = useFetch();
  const createPersonalProjectHandler = async (
    data: CreateProjectDataInterface
  ) => {
    await postRequest(API_POST_CREATE_NEW_PERSONAL_PROJECT, data);
  };

  return <NewProject createProjectHandler={createPersonalProjectHandler} />;
};
