import { noProfileImg } from "@/assets";
import { Button } from "@components/custom/Button";
import { Input } from "@components/custom/Input";
import { Textarea } from "@nextui-org/react";
import { FC } from "react";
import { FiCamera } from "react-icons/fi";
import { useUserProfile } from "@hooks/useEditProfile";
import { Loading } from "@components/project/Loading";

export interface UpdatedDataStateInterface {
  user_full_name: string;
  user_name: string;
  user_profile: string;
  summary: string;
}

export enum BasicInfoFields {
  user_name,
  full_name,
  gender,
  birthday,
  summary,
  avatarState,
}

export const Profile: FC = () => {
  const {
    getUser,

    editUserMutation,
    updateUserProfileMutation,

    avatarInputRef,
    avatarState,
    setAvatarState,

    editField,
    setEditField,

    editedDataState,

    cancelButtonHandler,

    editAvatarHandler,
    avatarInputChangeHandler,
    updateProfileHandler,

    userNameOnChangeHandler,
    updateUserNameHandler,

    userFullNameOnChangeHandler,
    updateUserFullNameHandler,

    summaryOnChangeHandler,
    updateSummaryHandler,
  } = useUserProfile();

  const { isLoading, data: user, error } = getUser;

  if (error) return <div>{error.message}</div>;
  return (
    <div className="dark:text-white text-light_mode_text px-16 py-12">
      {isLoading || (editUserMutation.isPending && <Loading />)}
      <div className="px-14 flex items-center bg-light_mode_hard dark:bg-white/10 ring-1 ring-white/50 rounded-lg w-full h-[400px]">
        <div className="flex gap-10">
          <div
            onClick={editAvatarHandler}
            className="relative flex flex-col  group cursor-pointer"
          >
            <input
              onChange={avatarInputChangeHandler}
              ref={avatarInputRef}
              hidden
              type="file"
            />
            <img
              className="w-[200px] group-hover:opacity-50 h-[200px] object-cover rounded-2xl ring-2 ring-white/30"
              src={`${
                avatarState
                  ? URL.createObjectURL(avatarState)
                  : user?.user_profile
                  ? `${import.meta.env.VITE_BASE_URL}/${user?.user_profile}`
                  : noProfileImg
              }`}
              alt=""
            />
            {editField === BasicInfoFields.avatarState && (
              <div className="mt-3 flex flex-col gap-3">
                <Button
                  isLoading={updateUserProfileMutation.isPending}
                  onClick={updateProfileHandler}
                >
                  save
                </Button>
                <Button
                  onClick={() => {
                    cancelButtonHandler("user_profile");
                    setAvatarState(null);
                  }}
                >
                  cancel
                </Button>
              </div>
            )}
            <div className="scale-0 group-hover:scale-100 absolute flex flex-col items-center right-[50%] top-[50%] translate-x-[50%] translate-y-[-50%]">
              <FiCamera size="50" />
              <span>Edit</span>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-poppins">
              {user?.user_full_name || ""}
            </h2>
            <span className="text-large font-poppins text-gray-500 dark:text-gray-300">
              {user?.user_name}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[700px] bg-light_mode_primary dark:bg-white/10 backdrop-blur-sm ring-1 ring-white/50 lg:mt-[-100px] rounded-xl p-8">
          <div>
            <div>
              <h2 className="font-medium text-2xl">Basic info</h2>
            </div>
            <div className="flex flex-col gap-2 border-b border-light_mode_text dark:border-gray-500 py-4">
              <div className="flex justify-between text-xl">
                <span>User Name</span>
                {editField !== BasicInfoFields.user_name && (
                  <span
                    className="cursor-pointer"
                    onClick={() => setEditField(BasicInfoFields.user_name)}
                  >
                    Edit
                  </span>
                )}
              </div>
              <div>
                {editField !== BasicInfoFields.user_name ? (
                  <span className="text-xl">{user?.user_name || ""}</span>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Input
                      color="hash"
                      defaultValue={editedDataState.user_name}
                      onChange={userNameOnChangeHandler}
                    />
                    <div className="flex gap-2">
                      <Button onClick={updateUserNameHandler}>save</Button>
                      <Button onClick={() => cancelButtonHandler("user_name")}>
                        cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 border-b border-light_mode_text dark:border-gray-500 py-4">
              <div className="flex justify-between text-xl">
                <span>Full Name</span>
                {editField !== BasicInfoFields.full_name && (
                  <span
                    className="cursor-pointer"
                    onClick={() => setEditField(BasicInfoFields.full_name)}
                  >
                    Edit
                  </span>
                )}
              </div>
              <div>
                {editField !== BasicInfoFields.full_name ? (
                  <span className="text-xl">{user?.user_full_name || ""}</span>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Input
                      color="hash"
                      defaultValue={editedDataState.user_full_name}
                      onChange={userFullNameOnChangeHandler}
                    />
                    <div className="flex gap-2">
                      <Button onClick={updateUserFullNameHandler}>save</Button>
                      <Button
                        onClick={() => cancelButtonHandler("user_full_name")}
                      >
                        cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 border-b border-light_mode_text dark:border-gray-500 py-4">
              <div className="flex justify-between text-xl">
                <span>Gender</span>
                {editField !== BasicInfoFields.gender && (
                  <span
                    className="cursor-pointer"
                    onClick={() => setEditField(BasicInfoFields.gender)}
                  >
                    Edit
                  </span>
                )}
              </div>
              <div>
                {editField !== BasicInfoFields.gender ? (
                  <span className="text-xl">Male</span>
                ) : (
                  <div className="flex flex-col gap-2">
                    <select className="text-black">
                      <option>Select..</option>
                      <option value="">Male</option>
                      <option value="">Female</option>
                      <option value="">Other</option>
                    </select>
                    <div className="flex gap-2">
                      <Button>save</Button>
                      <Button onClick={() => setEditField(null)}>cancel</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 border-b border-light_mode_text dark:border-gray-500 py-4">
              <div className="flex justify-between text-xl">
                <span>Birthday</span>
                {editField !== BasicInfoFields.birthday && (
                  <span
                    className="cursor-pointer"
                    onClick={() => setEditField(BasicInfoFields.birthday)}
                  >
                    Edit
                  </span>
                )}
              </div>
              <div>
                {editField !== BasicInfoFields.birthday ? (
                  <span className="text-xl">20 June, 2003</span>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Input value={"helelelelelelel"} />
                    <div className="flex gap-2">
                      <Button>save</Button>
                      <Button onClick={() => setEditField(null)}>cancel</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 border-b border-light_mode_text dark:border-gray-500 py-4">
              <div className="flex justify-between text-xl">
                <span>Summary</span>
                {editField !== BasicInfoFields.summary && (
                  <span
                    className="cursor-pointer"
                    onClick={() => setEditField(BasicInfoFields.summary)}
                  >
                    Edit
                  </span>
                )}
              </div>
              <div>
                {editField !== BasicInfoFields.summary ? (
                  <span className="text-xl">{user?.summary || ""}</span>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Textarea
                      onChange={summaryOnChangeHandler}
                      className="text-black"
                      defaultValue={editedDataState.summary || ""}
                    />
                    <div className="flex gap-2">
                      <Button onClick={updateSummaryHandler}>save</Button>
                      <Button onClick={() => cancelButtonHandler("summary")}>
                        cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
