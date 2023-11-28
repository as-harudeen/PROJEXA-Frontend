export enum ProjectStatusEnum {
  pending="pending",
  onprogress="onprogress",
  completed="completed",
}

export interface ProjectInterface {
  project_id: string;
  project_name: string;
  project_desc: string;
  project_start_date: Date;
  project_end_date: Date;
  project_status: ProjectStatusEnum;
  project_reference: ProjectReferencesInterface[];
}

export interface ProjectReferencesInterface {
  title: string;
  link: string;
}

export interface ProjectFormInterface {
  project_name: string;
  project_desc: string;
  project_start_date: Date;
  project_end_date: Date;
}

export interface CreateProjectDataInterface extends ProjectFormInterface {
  project_reference: ProjectReferencesInterface[];
}


export interface UpdateProjectInterface {
  project_name?: string;
  project_desc?: string;
  project_start_date?: Date;
  project_end_date?: Date;
  project_reference?: {
    title: string;
    link: string;
  }[];
}