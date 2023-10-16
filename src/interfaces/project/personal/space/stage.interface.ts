export interface TaskInterface {
    task_id: string;
    task_title: string;
    task_desc?: string;
}


export interface ProjectStageInterface {
    stage_id: string;
    stage_title: string;
    tasks: TaskInterface[]
}