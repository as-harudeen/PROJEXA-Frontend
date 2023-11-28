import { TaskCard } from "@components/project/team/task-distribution/Task-Card";
import {
  TaskStatus,
  useTeamProjectSpace,
} from "@hooks/project/team-project/useTeamProjectSpace";
import { FC } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { useParams } from "react-router-dom";

export const TeamProjectSpace: FC = () => {
  const { team_id, project_id } = useParams();
  const {
    teamProjectSpaceQuery: { data },
    changeTaskStatusMutation,
  } = useTeamProjectSpace({
    team_id: team_id!,
    project_id: project_id!,
  });

  const dragEndHandler = async (result: DropResult) => {
    const { destination, source, draggableId: task_id } = result;

    if (!destination?.droppableId) {
      console.log("out of boundary");
      return;
    }

    if (destination.droppableId === source.droppableId) {
      console.log("No changes");
      return;
    }

    changeTaskStatusMutation.mutate({
      task_id,
      task_status: source.droppableId as TaskStatus,
      new_task_status: destination.droppableId as TaskStatus,
    });
  };

  return (
    <div className="px-16 py-8 text-white ">
      <div>
        <h2 className="font-semibold text-xl">Team-Project-Space</h2>
      </div>
      <div className="flex gap-5 pt-10">
        <DragDropContext onDragEnd={dragEndHandler}>
          <div className="border-1 h-[400px] w-[250px] rounded-lg">
            <div className="flex justify-center py-2 border-b-1">
              <span className="font-medium text-large">Todo</span>
            </div>
            <Droppable droppableId="todo">
              {(provider) => (
                <div
                  {...provider.droppableProps}
                  ref={provider.innerRef}
                  className="flex flex-col gap-3 p-4"
                >
                  {data?.todo_tasks.map((task, idx) => (
                    <Draggable
                      index={idx}
                      key={task.task_id}
                      draggableId={task.task_id}
                    >
                      {(provider) => (
                        <div
                          {...provider.draggableProps}
                          {...provider.dragHandleProps}
                          ref={provider.innerRef}
                          className="border-1 p-3 rounded-lg flex justify-between break-all"
                        >
                          <TaskCard taskDetails={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provider.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="border-1 h-[400px] w-[250px] rounded-lg">
            <div className="flex justify-center py-2 border-b-1">
              <span className="font-medium text-large">Doing</span>
            </div>
            <Droppable droppableId="doing">
              {(provider) => (
                <div
                  {...provider.droppableProps}
                  ref={provider.innerRef}
                  className="flex flex-col gap-3 p-4"
                >
                  {data?.doing_tasks.map((task, idx) => (
                    <Draggable
                      index={idx}
                      key={task.task_id}
                      draggableId={task.task_id}
                    >
                      {(provider) => (
                        <div
                          {...provider.draggableProps}
                          {...provider.dragHandleProps}
                          ref={provider.innerRef}
                          className="border-1 p-3 rounded-lg flex justify-between break-all"
                        >
                          <TaskCard taskDetails={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provider.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="border-1 h-[400px] w-[250px] rounded-lg">
            <div className="flex justify-center py-2 border-b-1">
              <span className="font-medium text-large">Done</span>
            </div>
            <Droppable droppableId="done">
              {(provider) => (
                <div
                  {...provider.droppableProps}
                  ref={provider.innerRef}
                  className="flex flex-col gap-3 p-4"
                >
                  {data?.done_tasks.map((task, idx) => (
                    <Draggable
                      index={idx}
                      key={task.task_id}
                      draggableId={task.task_id}
                    >
                      {(provider) => (
                        <div
                          {...provider.draggableProps}
                          {...provider.dragHandleProps}
                          ref={provider.innerRef}
                          className="border-1 p-3 rounded-lg flex justify-between break-all"
                        >
                          <TaskCard taskDetails={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provider.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};
