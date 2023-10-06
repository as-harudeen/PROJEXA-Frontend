export interface PersonalNewProjectProps {
  projectType: "team" | "company";
  teamId: string;
}

export interface ProjectReferencesInterface {
  title: string;
  link: string;
}

export interface ProjectInterface {
  projectName: string;
  startDate: Date;
  endDate: Date;
  description: string;
}
