import React, { FC, useEffect, useState } from "react";
import styles from "../../style";
import PendingIcon from "@mui/icons-material/Pending";
import moment from "moment";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
} from "@nextui-org/react";
import { RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { getRequest } from "../../helper/api.helper";

interface ProjectInterface {
  project_id: string;
  project_name: string;
  project_desc: string;
  project_start_date: string;
  project_end_date: string;
  project_status: string;
}

export const OverView: FC = () => {
  const [totalPage, setTotalPage] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));

  const fetchProjects = async () => {
    try {
      let url = `/project/personal?p=${currPage}&`;

      if (searchValue) url += `s=${searchValue}&`;
      if (selectedKeys.size > 1) {
        const keys: string[] = [];
        selectedKeys.forEach((item) => {
          if (item) keys.push(item);
        });
        url += `f=${JSON.stringify(keys)}`;
      }
      console.log(url);
      const res = await getRequest(url);
      setProjects(res.data as ProjectInterface[]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProjectscount = async () => {
    try {
      const res = await getRequest<number>("/project/personal/count");
      const pageNumber = Math.ceil(+res.data / 3);
      setTotalPage(pageNumber);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    fetchProjectscount();
  }, [searchValue, selectedKeys.size]);

  useEffect(() => {
    fetchProjects();
  }, [searchValue, selectedKeys.size, currPage]);

  return (
    <div className="px-16 py-12">
      <div className="flex justify-between mb-5">
        <h2 className="text-white text-2xl font-poppins font-semibold">
          Personal Projects
        </h2>
        <div className="flex gap-3">
          <Input
            value={searchValue}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setSearchValue(value);
            }}
            label="Search"
            radius="lg"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search..."
            startContent={
              <RiSearchLine className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 rotate-90" />
            }
          />
          <div className="h-full flex items-end">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize text-white">
                  {"filterby"}
                </Button>
                {/* <div className="text-white">
                  <h6>filter</h6>
                </div> */}
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Multiple selection example"
                variant="flat"
                closeOnSelect={false}
                disallowEmptySelection
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={(key) => {
                  setSelectedKeys(key as Set<string>);
                }}
              >
                <DropdownItem key="pending">Pending</DropdownItem>
                <DropdownItem key="onprogress">OnProgress</DropdownItem>
                <DropdownItem key="completed">Completed</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className={`gap-6 px-6 py-6 flex-wrap ${styles.flexStart}`}>
        {projects.map((project) => (
          <div
            key={project.project_id}
            className="relative flex-1 flex flex-col justify-between bg-hash_two rounded-lg min-w-full xs:min-w-[300px] max-w-[300px] px-6 py-4 text-white"
          >
            <div className="absolute right-[-5px] top-[-5px]">
              <PendingIcon fontSize="large" />
            </div>
            <div className="flex-1">
              <div className="">
                <h6 className="font-poppins text-xl font-medium">
                  {project.project_name}
                </h6>
              </div>
              <div className="flex flex-col justify-between py-6 min-h-[280px]">
                <p>{project.project_desc}</p>
                <div className="mt-4">
                  <h5 className="font-medium">
                    Start Date:-{" "}
                    <span className="font-normal">
                      {moment(project.project_start_date).format("DD-MM-YY")}
                    </span>
                  </h5>
                  <h5 className="font-medium">
                    Start Date:-{" "}
                    <span className="font-normal">
                      {moment(project.project_end_date).format("DD-MM-YY")}
                    </span>
                  </h5>
                </div>
              </div>
            </div>
            <div>
              <Link to={`${project.project_id}`}>
                <button className="w-full border-2 py-2 rounded-md font-nunito font-medium bg-hash_dark_two">
                  Project Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-10">
        {projects.length && (
          <Pagination
            onChange={(count) => setCurrPage(count)}
            isCompact
            showControls
            total={totalPage}
            initialPage={currPage}
          />
        )}
      </div>
    </div>
  );
};
