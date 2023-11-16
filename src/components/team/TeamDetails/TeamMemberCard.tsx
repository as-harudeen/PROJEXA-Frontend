import { noProfileImg } from "@/assets";
import { Link } from "react-router-dom";
import {
  CurrentUserRoles,
  SelectedUserRoles,
  TeamMemberDropdown,
} from "./TeamMemberDropdown";
import { ErrorBoundary } from "react-error-boundary";

interface TeamMemberProps {
  user_id: string;
  user_name: string;
  user_profile: string;
  isCurrentUser: boolean;
  currentUserRole: CurrentUserRoles | "team_member";
  role: SelectedUserRoles | "team_lead";
}

export const TeamMemberCard = ({
  user_id,
  user_name,
  user_profile,
  currentUserRole,
  role,
  isCurrentUser,
}: TeamMemberProps) => {
  const isOptionAvailable =
    (currentUserRole === "team_lead" && role !== "team_lead") ||
    (currentUserRole === "team_admin" && role !== "team_lead");

  return (
    <div className="relative px-4 py-2 flex justify-between items-center max-w-[500px] min-w-[250px]  md:h-[80px] sm:h-[70px] bg-light_mode_hard dark:bg-hash_two rounded-xl">
      <div className="flex-1 flex items-center gap-3">
        <div>
          <Link to={`/${user_name}`}>
            <img
              className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-cover rounded-full"
              src={
                user_profile
                  ? `${import.meta.env.VITE_BASE_URL}/${user_profile}`
                  : noProfileImg
              }
              alt=""
            />
          </Link>
        </div>
        <div className="flex-1 flex justify-between gap-3 ">
          <div>
            <h6 className="font-medium">{user_name}</h6>
          </div>
          {role === "team_admin" ||
            (role === "team_lead" && (
              <div>
                <span className="text-light_hash font-nunito text-large">
                  admin
                </span>
              </div>
            ))}
        </div>
      </div>
      {isOptionAvailable && !isCurrentUser && (
        <div className="absolute right-2 top-2">
          <ErrorBoundary  fallback={<div>something went wrong</div>}>
            <TeamMemberDropdown
              user_id={user_id}
              currentUserRole={
                currentUserRole === "team_admin" ? "team_admin" : "team_lead"
              }
              selectedUserRole={role}
            />
          </ErrorBoundary>
        </div>
      )}
    </div>
  );
};
