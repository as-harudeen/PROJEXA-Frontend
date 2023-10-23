import {
  BasicInfoFields,
  UpdatedDataStateInterface,
} from "@pages/user/Profile";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useUser from "./useUser";
import { useUserStore } from "@/store/useUserStore";

export const useUserProfile = () => {
  const { updateUser: updateUserStoreData, user: userStoreData } = useUserStore(
    (state) => state
  );

  const { getUser, editUserMutation, updateUserProfileMutation } = useUser();
  const { isSuccess, data: user } = getUser;

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatarState, setAvatarState] = useState<null | File>(null);

  const [editField, setEditField] = useState<BasicInfoFields | null>(null);
  const [editedDataState, setEditedDataState] =
    useState<UpdatedDataStateInterface>({
      user_name: "",
      user_full_name: "",
      user_profile: "",
      summary: "",
    });

  useEffect(() => {
    if (isSuccess) {
      setEditedDataState({
        user_name: user.user_name,
        user_full_name: user.user_full_name,
        user_profile: user.user_profile || "",
        summary: user.summary || "",
      });
    }
  }, [isSuccess]);

  const cancelButtonHandler = (
    cancelField: "user_name" | "summary" | "user_profile" | "user_full_name"
  ) => {
    setEditField(null);
    setEditedDataState((prev) => ({
      ...prev,
      [cancelField]: user![cancelField],
    }));
  };

  const editAvatarHandler = () => {
    if (editField !== BasicInfoFields.avatarState)
      setEditField(BasicInfoFields.avatarState);
    avatarInputRef.current!.click();
  };

  const avatarInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0])
      setAvatarState(e.currentTarget.files[0]);
  };

  const updateProfileHandler = async () => {
    if (avatarState !== null) {
      const formData = new FormData();
      formData.append("user_profile", avatarState);
      updateUserProfileMutation.mutate(formData);
    }
  };

  const userNameOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setEditedDataState((prev) => ({ ...prev, user_name: value }));
  };

  const updateUserNameHandler = async () => {
    const editedUserName = editedDataState.user_name.trim();
    if (editedUserName !== user!.user_name) {
      if (editedUserName.length < 4) {
        return console.log("User name should be more than 3 character");
      }
      editUserMutation.mutate({ user_name: editedUserName });
      if (editUserMutation.isSuccess) {
        updateUserStoreData({ ...userStoreData!, user_name: editedUserName });
      }
    }
    setEditField(null);
  };

  const userFullNameOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setEditedDataState((prev) => ({ ...prev, user_full_name: value }));
  };

  const updateUserFullNameHandler = async () => {
    const editedUserFullName = editedDataState.user_full_name.trim();
    if (editedUserFullName !== user!.user_name) {
      if (editedUserFullName.length < 4) {
        return console.log("User full name should be more than 3 character");
      }
      editUserMutation.mutate({ user_full_name: editedUserFullName });
    }
    setEditField(null);
  };

  /*
  perform with summary
   */
  const summaryOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setEditedDataState((prev) => ({ ...prev, summary: value }));
  };

  const updateSummaryHandler = () => {
    const editedSummery = editedDataState.summary.trim();
    if (editedSummery !== user?.summary) {
      editUserMutation.mutate({ summary: editedSummery });
    }
    setEditField(null);
  };

  return {
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
  };
};
