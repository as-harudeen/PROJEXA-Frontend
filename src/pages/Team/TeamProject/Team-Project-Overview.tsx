import { Button } from "@components/custom/Button";
import { ProjectCard } from "@components/project/ProjectCard";
import { useTeamProjects } from "@hooks/project/team-project/useTeamProjects";
import { FC } from "react";
import { Link, useParams } from "react-router-dom";

export const TeamProjectOverview: FC = () => {
    const { team_id } = useParams();
    const { teamProjectsQuery: {data: projects}} = useTeamProjects(team_id!);

  return (
    <div className="text-white px-16 py-8 font-poppins">
      <div className="mb-5">
        <h4 className="font-semibold text-2xl">Team Project Overview</h4>
      </div>
      <div className="bg-hash_one rounded-xl p-6">
        {projects?.map(project => (
          <ProjectCard 
          project_id={project.team_project_id}
          project_name={project.project_name}
          project_desc={project.project_desc}
          project_start_date={project.project_start_date}
          project_end_date={project.project_end_date}
          />  
        ))}
        <div>
          <Link to="new">
            <Button>New Project</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
