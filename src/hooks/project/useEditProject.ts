import {
  ProjectFormInterface,
  ProjectReferencesInterface,
  UpdateProjectInterface,
} from "@/interfaces/project";
import { useFetch } from "@hooks/useFetch";
import { useZodForm } from "@hooks/useZodForm";
import { projectSchema } from "@/utils/zodValidator";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";



export const useEditProject = (
  submitUrl: string,
  projectDetails: ProjectFormInterface,
  projectReferences: ProjectReferencesInterface[],
  toggleEditMode: React.Dispatch<React.SetStateAction<boolean>>,
  updateState: (updatedData: UpdateProjectInterface) => void
) => {
  const { errors: err, register, handleSubmit } = useZodForm<ProjectFormInterface>(projectSchema);
  const editProjectWrapper = useRef<HTMLDivElement>(null);
  const { patchRequest } = useFetch();

  const onSubmit = async (newData: ProjectFormInterface) => {
    const update = filterChangedFields(newData, projectDetails);
    const response = await patchRequest(submitUrl, {
      ...update,
      project_reference: projectReferences,
    });

    if (response.status === 200) {
      const updatedData = await response.json();
      updateState(updatedData);
      toggleEditMode(false);
      toast.success("Project update successfully");
    } else if (response.status >= 400) {
      let message = "OPPS Something wrong";
      if (response.status === 401) message = "Authentication failed";
      else message = (await response.text()) || message;
      toast.error(message);
    }
  };

  useEffect(() => {
    editProjectWrapper.current!.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (err.project_name?.message) toast.error(err.project_name?.message);
    if (err.project_desc?.message) toast.error(err.project_desc.message);
    if (err.project_start_date?.message)
      toast.error(err.project_start_date.message);
    if (err.project_end_date?.message)
      toast.error(err.project_end_date.message);
  }, [err]);

  return {
    register,
    handleSubmit,
    onSubmit,
    editProjectWrapper
  };
};




const filterChangedFields = (
    currData: ProjectFormInterface,
    oldData: ProjectFormInterface
  ) => {
    const updatedField: Partial<ProjectFormInterface> = {};
  
    if (currData.project_name !== oldData.project_name) {
      updatedField.project_name = currData.project_name;
    }
  
    if (currData.project_desc !== oldData.project_desc) {
      updatedField.project_desc = currData.project_desc;
    }
  
    if (
      new Date(currData.project_start_date).toDateString() !==
      new Date(oldData.project_start_date).toDateString()
    ) {
      updatedField.project_start_date = currData.project_start_date;
    }
  
    if (
      new Date(currData.project_end_date).toDateString() !=
      new Date(oldData.project_end_date).toDateString()
    ) {
      updatedField.project_end_date = currData.project_end_date;
    }
  
    return updatedField;
  };