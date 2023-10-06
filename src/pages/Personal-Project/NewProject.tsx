import { FC, useEffect, useState } from "react";
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
  PersonalNewProjectProps,
  ProjectInterface,
  ProjectReferencesInterface,
} from "../../interfaces/project/personal/newProject.interface";
import { ProjectReferenceForm } from "../../components/project/ProjectReferenceForm";
import { axiosInstance } from "../../common/api";
import { isAxiosError } from "axios";

export const NewProject: FC<PersonalNewProjectProps | {}> = () => {
  const [projectReferences, setProjectReferences] = useState<
    ProjectReferencesInterface[]
  >([]);

  const {
    handleSubmit: handle,
    register: reg,
    errors: err,
    reset,
  } = useZodForm<ProjectInterface>(projectSchema);

  useEffect(() => {
    if (err.projectName?.message) toast.error(err.projectName?.message);
    if (err.description?.message) toast.error(err.description.message);
    if (err.startDate?.message) toast.error(err.startDate.message);
    if (err.endDate?.message) toast.error(err.endDate.message);
  }, [err]);

  const submitHandler = async (data: ProjectInterface) => {
    try {
      await axiosInstance.post("project/personal/new", {
        ...data,
        projectReferences,
      });
      toast.success("Project Created Successfully");

      reset();
      setProjectReferences([]);
    } catch (err) {
      let message = "OPPS Something wrong";
      if (isAxiosError(err)) {
        if (err.response?.status === 401) message = "Authentication failed";
        else message = err.response?.data.message || message;
      }

      toast.error(message);
    }
  };

  return (
    <div className="md:px-16 px-6 md:py-8 py-4 text-white rounded-xl">
      <h1 className="font-poppins sm:text-xl text-lg md:mb-6 mb-3 font-semibold">
        New Project
      </h1>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex-1 md:px-8 px-3 md:py-6 py-3 bg-hash_one rounded-lg ">
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
                          // setEditIdx(idx);
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
          />
        </div>
        <div className="flex-1 bg-hash_one rounded-lg md:px-8 px-3 md:py-6 py-3">
          <form onSubmit={handle(submitHandler)}>
            <div className="flex flex-col gap-4">
              <h3 className="font-poppins font-medium md:text-lg mb-3">
                Project Details
              </h3>
              <div className="flex gap-4">
                <Input
                  {...reg("projectName")}
                  isRequired
                  variant="bordered"
                  label="Project Name"
                  labelPlacement="outside"
                  placeholder="Enter your Project Name"
                  size="md"
                  name="projectName"
                  color="secondary"
                  classNames={{
                    input: [
                      "placeholder:text-white placeholder:text-opacity-60",
                    ],
                  }}
                />
              </div>
              <div className="flex gap-4">
                <Input
                  {...reg("startDate")}
                  isRequired
                  type="date"
                  variant="bordered"
                  label="Start date"
                  placeholder="Start date"
                  size="md"
                  labelPlacement="outside"
                  name="startDate"
                  color="secondary"
                  classNames={{
                    input: [
                      "placeholder:text-white placeholder:text-opacity-60",
                    ],
                  }}
                />
                <Input
                  {...reg("endDate")}
                  isRequired
                  type="date"
                  variant="bordered"
                  label="End date"
                  placeholder="End date"
                  size="md"
                  labelPlacement="outside"
                  name="endDate"
                  color="secondary"
                  onChange={(e) => console.log(e.currentTarget.value)}
                  classNames={{
                    input: [
                      "placeholder:text-white placeholder:text-opacity-60",
                    ],
                  }}
                />
              </div>
              <div>
                <Textarea
                  isRequired
                  {...reg("description")}
                  variant="bordered"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter Project Description."
                  color="secondary"
                  name="description"
                  classNames={{
                    input: [
                      "placeholder:text-white placeholder:text-opacity-60",
                    ],
                  }}
                />
              </div>
              <Button
                type="submit"
                className="text-white bg-hash_two hover:bg-light_hash mb-4"
                variant="bordered"
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
