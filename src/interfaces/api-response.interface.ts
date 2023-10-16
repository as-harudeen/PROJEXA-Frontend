import { TaskInterface } from "interfaces/project/personal/space/stage.interface";

export interface GetProjectStagesResponseInterface {
    stage_id: string;
    stage_title: string;
    tasks: TaskInterface[];
}