export interface TaskInterface {
    task_id: string;
    task_title: string;
    task_desc: string;
    task_priority: number;
}


export interface ProjectStageInterface {
    stage_id: string;
    stage_title: string;
    tasks: TaskInterface[]
}