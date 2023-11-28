import React, { FC, useEffect, useRef, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Textarea,
} from "@nextui-org/react";

import { useZodForm } from "../../hooks/useZodForm";
import { projectSchema } from "../../utils/zodValidator";
import { toast } from "react-toastify";
import {
  ProjectFormInterface,
  ProjectReferencesInterface,
  UpdateProjectInterface,
} from "../../interfaces/project";
import { ProjectReferenceForm } from "../../components/project/ProjectReferenceForm";
import { useFetch } from "@hooks/useFetch";

interface EditProjectPros {
  project_reference: ProjectReferencesInterface[];
  project_name: string;
  project_desc: string;
  project_start_date: Date;
  project_end_date: Date;
  toggleEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  submitUrl: string;
  updateState: (updatedData: UpdateProjectInterface) => void;
}

export const EditProject: FC<EditProjectPros> = ({
  submitUrl,
  project_reference,
  project_name,
  project_desc,
  project_start_date,
  project_end_date,
  toggleEditMode,
  updateState,
}) => {
  const [editIdx, setEditIdx] = useState<null | number>(null);
  const [projectReferences, setProjectReferences] =
    useState<ProjectReferencesInterface[]>(project_reference);
  const {
    handleSubmit: handle,
    register: reg,
    errors: err,
  } = useZodForm<ProjectFormInterface>(projectSchema);
  const editProjectWrapper = useRef<HTMLDivElement>(null);
  const { patchRequest } = useFetch();

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

  const submitHandler = async (data: ProjectFormInterface) => {
    const update = filterChangedFields(data);
    const response = await patchRequest(submitUrl, {
      ...update,
      project_reference: projectReferences,
    });

    if (response.status === 200) {
      // console.log('updatd successfully');
      const updatedData = await response.json();
      console.log(updatedData);
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

  const filterChangedFields = (data: ProjectFormInterface) => {
    const updatedField: Partial<ProjectFormInterface> = {};

    if (data.project_name !== project_name) {
      updatedField.project_name = data.project_name;
    }

    if (data.project_desc !== project_desc) {
      updatedField.project_desc = data.project_desc;
    }

    if (
      new Date(data.project_start_date).toDateString() !==
      new Date(project_start_date).toDateString()
    ) {
      updatedField.project_start_date = data.project_start_date;
    }

    if (
      new Date(data.project_end_date).toDateString() !=
      new Date(project_end_date).toDateString()
    ) {
      updatedField.project_end_date = data.project_end_date;
    }

    return updatedField;
  };

  return (
    <div
      ref={editProjectWrapper}
      className="md:px-16 px-6 md:py-8 py-4 text-light_mode_text dark:text-white rounded-xl"
    >
      <h1 className="font-poppins sm:text-xl text-lg md:mb-6 mb-3 font-semibold">
        Edit Project
      </h1>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex-1 md:px-8 px-3 md:py-6 py-3 bg-light_mode_primary dark:bg-hash_one rounded-lg shadow-md">
          <h3 className="font-poppins font-medium sm:text-lg mb-3">
            Project Reference
          </h3>

          <div className="md:px-6 px-3">
            <ul className="flex flex-wrap gap-2">
              {projectReferences.map((item, idx) => (
                <li key={idx}>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button className="text-md font-poppins bg-light_mode_hard dark:bg-hash_two">
                        {item.title.length < 10
                          ? item.title
                          : item.title.slice(0, 10) + "..."}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Example with disabled actions">
                      <DropdownItem
                        onClick={() => window.open(item.link)}
                        key="copy"
                      >
                        Visit
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          setEditIdx(idx);
                        }}
                        key="edit"
                      >
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        onClick={() =>
                          setProjectReferences((prev) =>
                            prev.filter((i) => i.title !== item.title)
                          )
                        }
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </li>
              ))}
            </ul>
          </div>
          <ProjectReferenceForm
            editIdx={editIdx}
            projectReferences={projectReferences}
            setEditIdx={setEditIdx}
            setProjectReferences={setProjectReferences}
          />
        </div>
        <div className="flex-1 bg-light_mode_primary dark:bg-hash_one rounded-lg md:px-8 px-3 md:py-6 py-3 shadow-md">
          <form onSubmit={handle(submitHandler)}>
            <div className="flex flex-col gap-4">
              <h3 className="font-poppins font-medium md:text-lg mb-3">
                Project Details
              </h3>
              <div className="flex gap-4">
                <Input
                  defaultValue={project_name}
                  {...reg("project_name")}
                  isRequired
                  variant="bordered"
                  label="Project Name"
                  labelPlacement="outside"
                  placeholder="Enter your Project Name"
                  size="md"
                  name="project_name"
                  color="secondary"
                  classNames={{
                    input: [
                      "dark:placeholder:text-white placeholder:text-opacity-60",
                    ],
                    label: ["dark:text-white", "text-light_mode_text"],
                    inputWrapper: [
                      "bg-light_mode_tertiary",
                      "dark:bg-transparent",
                      "border",
                      "border-light_mode_text",
                    ],
                  }}
                />
              </div>
              <div className="flex gap-4 ">
                <Input
                  defaultValue={new Date(project_start_date)
                    .toISOString()
                    .substring(0, 10)}
                  {...reg("project_start_date")}
                  type="date"
                  variant="bordered"
                  label="Start date"
                  placeholder="Start date"
                  size="md"
                  labelPlacement="outside"
                  name="project_start_date"
                  color="secondary"
                  classNames={{
                    input: [
                      "dark:placeholder:text-white placeholder:text-opacity-60",
                    ],
                    label: ["dark:text-white", "text-light_mode_text"],
                    inputWrapper: [
                      "bg-light_mode_tertiary",
                      "dark:bg-transparent",
                      "border",
                      "border-light_mode_text",
                    ],
                  }}
                />
                <Input
                  defaultValue={new Date(project_end_date)
                    .toISOString()
                    .substring(0, 10)}
                  {...reg("project_end_date")}
                  type="date"
                  variant="bordered"
                  label="End date"
                  placeholder="End date"
                  size="md"
                  labelPlacement="outside"
                  name="project_end_date"
                  color="secondary"
                  classNames={{
                    input: [
                      "dark:placeholder:text-white placeholder:text-opacity-60",
                    ],
                    label: ["dark:text-white", "text-light_mode_text"],
                    inputWrapper: [
                      "bg-light_mode_tertiary",
                      "dark:bg-transparent",
                      "border",
                      "border-light_mode_text",
                    ],
                  }}
                />
              </div>
              <div>
                <Textarea
                  defaultValue={project_desc}
                  isRequired
                  {...reg("project_desc")}
                  variant="bordered"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter Project Description."
                  color="secondary"
                  name="project_desc"
                  classNames={{
                    input: [
                      "dark:placeholder:text-white placeholder:text-opacity-60",
                    ],
                    label: [
                      "dark:text-white", "text-light_mode_text"
                    ],
                    inputWrapper: [
                      "bg-light_mode_tertiary",
                      "dark:bg-transparent",
                      "border", "border-light_mode_text"
                    ]
                  }}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  className="darK:text-white border-gray-500 dark:border-white hover:border-red-600 mb-4"
                  variant="bordered"
                  onClick={() => toggleEditMode(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="dark:text-white text-light_mode_text border border-light_mode_text dark:border-white bg-light_mode_hard dark:bg-hash_two hover:bg-light_mode_primary dark:hover:bg-light_hash mb-4"
                  variant="bordered"
                >
                  Save project
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
