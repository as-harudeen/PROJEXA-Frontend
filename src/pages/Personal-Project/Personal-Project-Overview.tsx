import { FC, useEffect, useState } from "react";
import styles from "../../style";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
} from "@nextui-org/react";
import { RiSearchLine } from "react-icons/ri";
import { Loading } from "@components/project/Loading";
import { usePersonalProjects } from "@hooks/project/personal-project/usePersonalProjects";
import { usePersonalProjectCounts } from "@hooks/project/personal-project/usePersonalProjectCounts";
import { ProjectCard } from "@components/project/ProjectCard";
import { Input } from "@components/custom/Input";
import { no_data } from "@/assets";

export const PersonalProjectOverview: FC = () => {
  const [currPage, setCurrPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([""]));

  const {
    personalProjectsQuery: {
      data: projects,
      isLoading,
      refetch: refetchProjects,
    },
  } = usePersonalProjects(currPage, searchValue, selectedKeys);
  const {
    personalProjectCountsQuery: {
      data: totalPage,
      refetch: refetchProjectsCount,
    },
  } = usePersonalProjectCounts();

  useEffect(() => {
    refetchProjectsCount();
  }, [searchValue, selectedKeys.size]);

  useEffect(() => {
    refetchProjects();
  }, [searchValue, selectedKeys.size, currPage]);

  return (
    <div className="px-6 sm:px-16 py-12">
      {isLoading && <Loading />}
      <div className="flex flex-col sm:flex-row justify-between mb-5">
        <h2 className="text-light_mode_text dark:text-white text-2xl font-poppins font-semibold">
          Personal Projects
        </h2>
        <div className="flex items-center gap-3">
          <Input
          size="sm"
            className="flex-1"
            value={searchValue}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setCurrPage(1);
              setSearchValue(value);
            }}
            label="Search"
            radius="lg"
            color="searchBar"
            placeholder="Type to search..."
            startContent={
              <RiSearchLine className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 rotate-90" />
            }
          />
          <div className="h-full flex items-end">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize text-light_mode_text  dark:text-white ">
                  {"filterby"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Multiple selection example"
                variant="flat"
                closeOnSelect={false}
                disallowEmptySelection
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={(key) => {
                  setCurrPage(1);
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
        {projects?.length === 0 && (
          <img className="w-[700px]" src={no_data}/>
        )}
        {projects?.map((project) => (
          <ProjectCard
            key={project.personal_project_id}
            project_id={project.personal_project_id}
            project_name={project.project_name}
            project_desc={project.project_desc}
            project_start_date={project.project_start_date}
            project_end_date={project.project_end_date}
          />
        ))}
      </div>
      <div className="flex justify-center my-10">
        {projects?.length && totalPage && (
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
