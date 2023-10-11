import { Button } from '@components/custom/Button';
import { Input } from '@components/custom/Input';
import { ProjectStageInterface } from "interfaces/project/personal/space/stage.interface";
import React, { FC, useEffect, useRef } from 'react';
import { getRequest, postRequest } from "../../../../helper/api.helper";
import { API_GET_PROJECT_STAGES, API_POST_CREATE_STAGE_TASK } from '@/constants/api.url';
import { useParams } from 'react-router-dom';
import { GetProjectStagesResponseInterface } from 'interfaces/api-response.interface';

type ProjectStageProps = {
    setParentState: React.Dispatch<React.SetStateAction<ProjectStageInterface[]>>;
} & ProjectStageInterface


export const ProjectStage: FC<ProjectStageProps> = ({stage_id,stage_title, tasks, setParentState}) => {
  const taskInpRef = useRef<HTMLInputElement>(null);
  const {project_id} = useParams();



  const addTaskHandler = async () => {
    const taskTitle = taskInpRef.current!.value;
    await postRequest(`${API_POST_CREATE_STAGE_TASK}/${project_id}/${stage_id}`, {task_title: taskTitle})
    const newTask = {
        task_id: Date.now().toString(),
        task_title: taskTitle
    }
    
    setParentState(prev => prev.map(stage => {
        if(stage.stage_id === stage_id) {
            return {...stage, tasks: [...stage.tasks, newTask]}
        }
        return stage;
    }));
    taskInpRef.current!.value = "";
  }
  return (
    <div className="border-2 border-white px-6 py-4 h-full">
    <div>
      <h6 className="text-white font-semibold">{stage_title}</h6>
    </div>
    <div >
        {tasks.map(task => <div>{task.task_title}</div>)}
      <Input
        ref={taskInpRef}
        label="Add task"
        placeholder=""
        color="border"
        variant="underlined"
      />
      <Button onClick={addTaskHandler}>Add</Button>
      <Button onClick={() => taskInpRef.current!.value = ""}>Cancel</Button>
    </div>
  </div>
  );
};