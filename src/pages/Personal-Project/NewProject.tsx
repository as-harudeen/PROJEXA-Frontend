import { FC, useEffect, useState } from "react";
import {
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
  CreateProjectDataInterface,
  ProjectFormInterface,
  ProjectReferencesInterface,
} from "../../interfaces/project";
import { ProjectReferenceForm } from "../../components/project/ProjectReferenceForm";
import { Button } from "@components/custom/Button";


interface NewProjectProps {
  createProjectHandler: (
    data: CreateProjectDataInterface
  ) => Promise<void>;
}

export const NewProject: FC<NewProjectProps> = ({ createProjectHandler }) => {
  const [projectReferences, setProjectReferences] = useState<
    ProjectReferencesInterface[]
  >([]);
  const [editIdx, setEditIdx] = useState<null | number>(null);

  const {
    handleSubmit: handle,
    register: reg,
    errors: err,
    reset,
  } = useZodForm<ProjectFormInterface>(projectSchema);

  useEffect(() => {
    if (err.project_name?.message) toast.error(err.project_name?.message);
    if (err.project_desc?.message) toast.error(err.project_desc?.message);
    if (err.project_start_date?.message)
      toast.error(err.project_start_date?.message);
    if (err.project_end_date?.message)
      toast.error(err.project_end_date.message);
  }, [err]);

  const submitHandler = async (data: ProjectFormInterface) => {

      createProjectHandler({...data, project_reference: projectReferences})

      toast.success("Project Created Successfully");
      reset();
      setProjectReferences([]);

  };

  return (
    <div className="md:px-16 px-6 md:py-8 py-4 text-light_mode_text dark:text-white rounded-xl">
      <h1 className="font-poppins sm:text-xl text-lg md:mb-6 mb-3 font-semibold">
        New Project
      </h1>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex-1 md:px-8 px-3 md:py-6 py-3 shadow-lg bg-light_mode_secondary dark:bg-white/10 backdrop-blur-md ring-1 ring-white/50 rounded-lg ">
          <h3 className="font-poppins font-medium sm:text-lg mb-3">
            Project Reference
          </h3>

          <div className="md:px-6 px-3">
            <ul className="flex flex-wrap gap-2">
              {projectReferences.map((item, idx) => (
                <li key={idx}>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button className="text-md font-poppins ">
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
            projectReferences={projectReferences}
            setProjectReferences={setProjectReferences}
            editIdx={editIdx}
            setEditIdx={setEditIdx}
          />
        </div>
        <div className="flex-1 bg-light_mode_secondary shadow-lg dark:bg-white/10 backdrop-blur-lg ring-1 ring-white/30 rounded-lg md:px-8 px-3 md:py-6 py-3">
          <form onSubmit={handle(submitHandler)}>
            <div className="flex flex-col gap-4">
              <h3 className="font-poppins font-medium md:text-lg mb-3">
                Project Details
              </h3>
              <div className="flex gap-4">
                <Input
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
              <div className="flex gap-4">
                <Input
                  {...reg("project_start_date")}
                  isRequired
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
                  {...reg("project_end_date")}
                  isRequired
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
              <Button
                type="submit"
                color="transperant"
              >
                Add project
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
