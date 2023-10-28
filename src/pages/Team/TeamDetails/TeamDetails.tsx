import { noProfileImg } from "@/assets";
import { UserCard } from "@pages/user/Connections";
import { FC, Suspense, lazy, useState } from "react";
import { Button } from "@components/custom/Button";
import { Link, useParams } from "react-router-dom";
import { Loading } from "@components/project/Loading";
const InvitationModal = lazy(
  () => import("../../../components/team/TeamDetails/InvitationalModal")
);
import { useTeamActivityLog } from "@hooks/team/useTeamActivityLog";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { PiNotification } from "react-icons/pi";
import { useTeamDetails } from "@hooks/team/useTeamDetails";

interface ActivityCardProps {
  log_text: string;
  logged_at: string;
}

const ActivityCard: FC<ActivityCardProps> = ({ log_text, logged_at }) => {
  return (
    <div className="border-b py-2">
      <div className="">
        <span className="text-small font-poppins">{log_text}</span>
      </div>
      <div className="flex justify-end">
        <span className="text-xs">{logged_at}</span>
      </div>
    </div>
  );
};

const ActivityModal = () => {
  const { team_id } = useParams();
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const {
    teamActivityLogQuery: { data },
  } = useTeamActivityLog(team_id!);

  return (
    <>
      {!isActivityModalOpen && (
        <div
          onClick={() => setIsActivityModalOpen(true)}
          className="absolute right-4 top-4 cursor-pointer"
        >
          <PiNotification size="28" />
        </div>
        // <Button open</Button>
      )}
      <div
        className={`fixed ${
          isActivityModalOpen ? "scale-100" : "scale-0"
        }  transition-transform duration-300 origin-top top-0 flex flex-col gap-3 right-6 bg-hash_one w-[400px] h-screen px-6 py-4 rounded-xl z-[99999]`}
      >
        <div
          onClick={() => setIsActivityModalOpen(false)}
          className="absolute right-1 top-1 cursor-pointer"
        >
          <AiOutlineCloseCircle size="28" />
        </div>
        <div>
          <h3 className="font-medium text-lg">Team Action History</h3>
        </div>
        <div className="flex-1 bg-hash_two rounded-xl p-4">
          {data?.map((log) => (
            <ActivityCard log_text={log.log_text} logged_at={log.logged_at} />
          ))}
        </div>
      </div>
    </>
  );
};

export const TeamDetails: FC = () => {
  const { team_id } = useParams();
  console.log("Team details component");
  const {
    teamDetailsQuery: { data, isLoading },
  } = useTeamDetails(team_id!);

  return (
    <div className="relative text-white px-16 py-12 font-poppins h-full flex flex-col justify-between">
      <ActivityModal />
      <div>
        {isLoading && <Loading />}
        <div className="float-right ms-4 mb-4 rounded-3xl border-3">
          <img
            className="w-[200px] h-[200px] object-cover rounded-3xl"
            src={
              data?.team_dp
                ? `${import.meta.env.VITE_BASE_URL}/${data.team_dp}`
                : noProfileImg
            }
            alt="team profile image"
          />
        </div>
        <div className="mb-6">
          <h3 className="font-medium text-xl">{data?.team_name || ""}</h3>
        </div>
        <div className="min-h-[250px]">
          <p className="text-md leading-6">{data?.team_desc || ""}</p>
        </div>
        <div>
          <div className="mt-10">
            <h4 className="mb-4 font-semibold text-lg">Team Lead</h4>
            {data && (
              <UserCard
                user_name={data.team_lead.user_name}
                user_profile={data.team_lead.user_profile}
              />
            )}
          </div>
          <div className="mt-10">
            <h4 className="font-medium text-lg mb-3">Team Members</h4>
            <div className="grid grid-cols-4 gap-3">
              {data && (
                <>
                  {data.team_admins.map((admin) => (
                    <UserCard
                      user_name={admin.user_name}
                      user_profile={admin.user_profile}
                    />
                  ))}
                  {data.team_members.map((member) => (
                    <UserCard
                      user_name={member.user_name}
                      user_profile={member.user_profile}
                    />
                  ))}
                </>
              )}
            </div>

            <div className="mb-10">
              {data && data.isCurrentUserAdmin && (
                <Suspense>
                  <InvitationModal
                    invitations={data.invitations}
                    team_member_ids={data.all_team_member_ids}
                  />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 ">
        <div className="flex-1">
          <Link to={`/team/${team_id}/projects`}>
            <Button className="w-full">Team Projects</Button>
          </Link>
        </div>
        <div>
          <Button>Edit Team</Button>
        </div>
      </div>
    </div>
  );
};
