import { test_img } from "@/assets";
import { Button } from "@components/custom/Button";
import { Input } from "@components/custom/Input";
import { Textarea } from "@nextui-org/react";
import { FC } from "react";
import { FiCamera } from "react-icons/fi";
import { useUserProfile } from "@hooks/useEditProfile";
import { Loading } from "@components/project/Loading";

export interface UpdatedDataStateInterface {
  user_name: string;
  user_profile: string;
  summary: string;
}

export enum BasicInfoFields {
  name,
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

    summaryOnChangeHandler,
    updateSummaryHandler,
  } = useUserProfile();

  const { isLoading, data: user, error } = getUser;

  if (error) return <div>{error.message}</div>;
  return (
    <div className="text-white px-16 py-12">
      {isLoading || (editUserMutation.isPending && <Loading />)}
      <div className="px-14 flex items-center bg-hash_one bg-opacity-20 w-full h-[400px]">
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
              className="w-[200px] group-hover:opacity-50 h-[200px] object-cover rounded-2xl border-[7px] border-light_hash"
              src={`${
                avatarState
                  ? URL.createObjectURL(avatarState)
                  : user!.user_profile
                  ? `http://localhost:3000/${user!.user_profile}`
                  : test_img
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
            <h2 className="text-2xl font-poppins">{user!.user_name}</h2>
            <span className="text-large font-poppins text-slate-300">
              {user!.user_email}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[700px] bg-hash_two mt-[-100px] rounded-xl p-8">
          <div>
            <div>
              <h2 className="font-medium text-2xl">Basic info</h2>
            </div>
            <div className="flex flex-col gap-2 border-b py-4">
              <div className="flex justify-between text-xl">
                <span>Name</span>
                {editField !== BasicInfoFields.name && (
                  <span
                    className="cursor-pointer"
                    onClick={() => setEditField(BasicInfoFields.name)}
                  >
                    Edit
                  </span>
                )}
              </div>
              <div>
                {editField !== BasicInfoFields.name ? (
                  <span className="text-xl">{user!.user_name}</span>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Input
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
            <div className="flex flex-col gap-2 border-b py-4">
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
            <div className="flex flex-col gap-2 border-b py-4">
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
            <div className="flex flex-col gap-2 border-b py-4">
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
                  <span className="text-xl">{user!.summary || ""}</span>
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
