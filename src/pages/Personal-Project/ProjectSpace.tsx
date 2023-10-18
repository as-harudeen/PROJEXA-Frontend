import { Input } from "@components/custom/Input";
import { MdAddToPhotos } from "react-icons/md";
import { FC,useRef, useState } from "react";
import { ProjectStageInterface } from "../../interfaces/project/personal/space/stage.interface";
import { ProjectStage } from "@components/project/personal/space/ProjectStage";

export const ProjectSpace: FC = () => {
  const stageInpRef = useRef<HTMLInputElement>(null);
  const [projectStages, setProjectStages] = useState<ProjectStageInterface[]>(
    []
  );








  return (
    <div className="text-white font-poppins px-16 py-8">
      <div className="mb-8">
        <h3 className="font-semibold text-xl">Project Space</h3>
      </div>

        <div className="flex gap-5 px-4 py-6 ">
          {projectStages.map((stage) => (
                <ProjectStage
                  {...stage}
                  setParentState={setProjectStages}
                />
          ))}
          <div>
            <div className="relative max-w-[300px]">
              <Input
                ref={stageInpRef}
                size="lg"
                label="Add stage"
                color="border"
                classNames={{
                  inputWrapper: [
                    "bg-opacity-30",
                    "bg-light_hash",
                    "group-data-[focus=true]:bg-opacity-20",
                    "group-data-[hover=true]:bg-opacity-30",
                    "pe-14",
                  ],
                  label: ["font-[500]", "font-poppins"],
                }}
              />
              <MdAddToPhotos
                onClick={() => {}}
                size="22"
                className="absolute right-3 top-[50%] translate-y-[-50%]"
              />
            </div>
          </div>
        </div>
    </div>
  );
};
