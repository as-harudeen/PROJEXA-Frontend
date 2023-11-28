import { noProfileImg } from "@/assets";
import { Button } from "@components/custom/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { Loading } from "@components/project/Loading";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/useUserStore";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useFetch } from "@hooks/useFetch";

type GETUserResponseInterface = {
  user_id: string;
  user_name: string;
  user_full_name: string;
  user_profile: string;
  summary: string;
  numberOfFollowing: number;
  numberOfFollowers: number;
  isCurrentUserFollowing: boolean;
} | null;

export const IndividualProfile: FC = () => {
  const { getRequest, postRequest } = useFetch();
  const queryClient = useQueryClient();
  const { user_name } = useParams();
  const loggedUserId = useUserStore((state) => state.user?.user_id);
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", "profile", `{user_name: ${user_name}}`],
    queryFn: async () => {
      const response = await getRequest(`user/${user_name}`);
      return (await response.json()) as GETUserResponseInterface;
    },
  });

  const navigate = useNavigate();

  const followMutation = useMutation({
    mutationFn: async () => {
      await postRequest(`user/follow/${userData?.user_id}`, {});
    },
    onSuccess: () => {
      queryClient.setQueryData(
        ["user", "profile", `{user_name: ${user_name}}`],
        (prev: GETUserResponseInterface) => ({
          ...prev,
          isCurrentUserFollowing: true,
          numberOfFollowers: ++prev!.numberOfFollowers,
        })
      );
    },
  });
  const unfollowMutation = useMutation({
    mutationFn: async () => {
      await postRequest(`user/unfollow/${userData?.user_id}`, {});
    },
    onSuccess: () => {
      queryClient.setQueryData(
        ["user", "profile", `{user_name: ${user_name}}`],
        (prev: GETUserResponseInterface) => ({
          ...prev,
          isCurrentUserFollowing: false,
          numberOfFollowers: --prev!.numberOfFollowers,
        })
      );
    },
  });

  const followButtonHandler = async () => {
    followMutation.mutate();
  };

  const unfollowButtonHandler = async () => {
    unfollowMutation.mutate();
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [isError]);

  return (
    <div className="dark:text-white text-light_mode_text font-poppins flex gap-8 px-16 py-12">
      {isLoading && <Loading />}
      <div className="flex flex-col gap-3 max-w-[250px]">
        <div>
          <img
            className="w-[250px] h-[250px] object-cover rounded-3xl"
            src={
              userData?.user_profile
                ? `${import.meta.env.VITE_BASE_URL}/${userData.user_profile}`
                : noProfileImg
            }
            alt=""
          />
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="font-semibold text-2xl">
              {userData?.user_full_name || ""}
            </h3>
            <span className="text-lg font-medium text-gray-400">
              <span>{userData?.user_name || ""}</span> <span>he/him</span>
            </span>
          </div>
          <div>
            <p>{userData?.summary || ""}</p>
          </div>
          <div className="flex gap-3 items-center">
            <FiUser />
            <Link to={`/${userData?.user_name}/following`}>
              <span className="hover:text-blue-500">
                following {userData?.numberOfFollowing}
              </span>
            </Link>
            <Link to={`/${userData?.user_name}/followers`}>
              <span className="hover:text-blue-500">
                followers {userData?.numberOfFollowers}
              </span>
            </Link>
          </div>
          {userData && (
            <div className="w-full">
              {userData.user_id === loggedUserId ? (
                <Button
                  onClick={() => navigate("/user/profile")}
                  className="w-full"
                >
                  Edit profile
                </Button>
              ) : (
                <>
                  {userData.isCurrentUserFollowing ? (
                    <Button
                      isLoading={unfollowMutation.isPending}
                      onClick={unfollowButtonHandler}
                      className="w-full"
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      isLoading={followMutation.isPending}
                      onClick={followButtonHandler}
                      className="w-full"
                    >
                      Follow
                    </Button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 w-[1000px] h-[1200px] dark:text-white text-light_mode_text bg-light_mode_primary dark:bg-dark_hash rounded-xl">
        <Outlet />
      </div>
    </div>
  );
};
