export interface PersonalNewProjectProps {
  projectType: "team" | "company";
  teamId: string;
}

export interface ProjectReferencesInterface {
  title: string;
  link: string;
}


export interface ProjectFormInterface {
  project_name: string;
  project_desc: string,
  project_start_date: Date,
  project_end_date: Date
}