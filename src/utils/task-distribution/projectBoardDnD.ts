export enum DnDOperation {
  StageToStage,
  StageToUser,
  UserToStage,
  UserToUser,
}

export const determineDnDOperation = (
  sourceId: string,
  destinationId: string
): DnDOperation | null => {
  const sourceIdComponents = sourceId.split("-");
  const destinationIdComponents = destinationId.split("-");

  if (sourceIdComponents[0] === "stageId") {
    if (destinationIdComponents[0] === "stageId") {
      return DnDOperation.StageToStage;
    }
    if (destinationIdComponents[0] === "userId") {
      return DnDOperation.StageToUser;
    }
  } else if (sourceIdComponents[0] === "userId") {
    if (destinationIdComponents[0] === "stageId") {
      return DnDOperation.UserToStage;
    }
    if(destinationIdComponents[0] === "userId") {
      return DnDOperation.UserToUser;
    }
  }

  return null;
};
