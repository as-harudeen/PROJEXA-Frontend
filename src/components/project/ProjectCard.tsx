import React, { FC } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import PendingIcon from "@mui/icons-material/Pending";

interface ProjectCardProps {
  project_id: string;
  project_name: string;
  project_desc: string;
  project_start_date: Date;
  project_end_date: Date;
  innerRef?: React.Ref<HTMLDivElement>;
}

export const ProjectCard: FC<ProjectCardProps> = ({
  project_id,
  project_name,
  project_desc,
  project_start_date,
  project_end_date,
  innerRef
}) => {
  return (
    <div ref={innerRef} className="relative flex-1 flex flex-col justify-between bg-light_mode_hard dark:bg-hash_two rounded-lg min-w-full xs:min-w-[300px] max-w-[300px] px-6 py-4 text-light_mode_text dark:text-white">
      <div className="absolute right-[-5px] top-[-5px]">
        <PendingIcon fontSize="large" />
      </div>
      <div className="flex-1">
        <div className="">
          <h6 className="font-poppins text-xl font-medium">{project_name}</h6>
        </div>
        <div className="flex flex-col justify-between py-6 min-h-[280px]">
          <p>{project_desc}</p>
          <div className="mt-4">
            <h5 className="font-medium">
              Start Date:-{" "}
              <span className="font-normal">
                {moment(project_start_date).format("DD-MM-YY")}
              </span>
            </h5>
            <h5 className="font-medium">
              Start Date:-{" "}
              <span className="font-normal">
                {moment(project_end_date).format("DD-MM-YY")}
              </span>
            </h5>
          </div>
        </div>
      </div>
      <div>
        <Link to={`${project_id}`}>
          <button className="w-full border border-light_mode_text py-2 rounded-md font-nunito font-medium bg-light_mode_tertiary dark:bg-hash_dark_two">
            Project Details
          </button>
        </Link>
      </div>
    </div>
  );
};
