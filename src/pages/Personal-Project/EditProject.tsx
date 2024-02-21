import React, { FC, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Textarea,
} from "@nextui-org/react";

import {
  ProjectReferencesInterface,
  UpdateProjectInterface,
} from "../../interfaces/project";
import { ProjectReferenceForm } from "../../components/project/ProjectReferenceForm";
import { useEditProject } from "@hooks/project/useEditProject";

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

  const projectDetails = {
    project_name,
    project_desc,
    project_start_date,
    project_end_date,
  };
  const { editProjectWrapper, handleSubmit, onSubmit, register } =
    useEditProject(
      submitUrl,
      projectDetails,
      projectReferences,
      toggleEditMode,
      updateState
    );

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <h3 className="font-poppins font-medium md:text-lg mb-3">
                Project Details
              </h3>
              <div className="flex gap-4">
                <Input
                  defaultValue={project_name}
                  {...register("project_name")}
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
                  {...register("project_start_date")}
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
                  {...register("project_end_date")}
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
                  {...register("project_desc")}
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
