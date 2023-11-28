import { noProfileImg } from "@/assets";
import { Input } from "@components/custom/Input";
import { Textarea } from "@nextui-org/react";
import { FC, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@components/custom/Button";
import { useParams } from "react-router-dom";
import { useTeamDetails } from "@hooks/team/useTeamDetails";
import { Loading } from "@components/project/Loading";
import { useFetch } from "@hooks/useFetch";

export const EditTeam: FC = () => {
  const { team_id } = useParams();
  const {patchRequest} = useFetch();
  const {
    teamDetailsQuery: { data, isLoading },
  } = useTeamDetails(team_id!);
  const [teamDp, setTeamDp] = useState<File | null>(null);
  const dpInputRef = useRef<HTMLInputElement>(null);

  const [editedTeam, setEditedTeam] = useState({
    team_name: data?.team_name || "",
    team_desc: data?.team_desc || "",
    team_dp: "",
  });

  /**Performing with teamp DP */

  const dpOnClickHandler = () => {
    dpInputRef.current!.click();
  };

  const dpInputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files || !e.currentTarget.files[0]) return;
    const newDp = e.currentTarget.files[0];
    setTeamDp(newDp);
  };

  const dpRemoveButtonClickHandler = () => {
    setTeamDp(null);
    dpInputRef.current!.value = "";
  };

  const formSubmitHandler = async () => {
    const formData = new FormData();
    let isEdited = false;
    if (editedTeam.team_name !== data?.team_name) {
      formData.append("team_name", editedTeam.team_name);
      isEdited = true;
    }
    if (editedTeam.team_desc !== data?.team_desc) {
      formData.append("team_desc", editedTeam.team_desc);
      isEdited = true;
    }

    if (teamDp) {
      formData.append("team_dp", teamDp);
      isEdited = true;
    }
    if (!isEdited) return;

    try {
      await patchRequest(`team/${team_id}`, formData);
      toast.success("Team edited successfully");
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="text-light_mode_text dark:text-white px-16 py-12 font-poppins">
      <div className="mb-10">
        <h2 className="font-semibold text-2xl">Initiate Team</h2>
      </div>
      <div className="w-full h-[900px] dark:bg-dark_hash bg-light_mode_primary">
        <form>
          <div className="flex gap-5 p-6">
            <div className="relative">
              {/* {teamDp && (
                <div
                  onClick={dpRemoveButtonClickHandler}
                  className="absolute right-[-4px] top-[-4px] bg-red-500 p-1 rounded-md cursor-pointer"
                >
                  <AiOutlineDelete size="18" />
                </div>
              )} */}
              <input
                onChange={dpInputOnChangeHandler}
                ref={dpInputRef}
                type="file"
                hidden
              />
              <img
                onClick={dpOnClickHandler}
                className="w-[200px] h-[200px] object-cover rounded-2xl"
                src={
                  teamDp
                    ? URL.createObjectURL(teamDp)
                    : data?.team_dp
                    ? `${import.meta.env.VITE_BASE_URL}/${data.team_dp}`
                    : noProfileImg
                }
                alt=""
              />
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <div>
                <Input
                  defaultValue={editedTeam.team_name}
                  size="xl"
                  labelPlacement="outside"
                  label="Team Name"
                  placeholder="Enter team name"
                  color="hash"
                  onChange={(e) =>
                    setEditedTeam((prev) => ({
                      ...prev,
                      team_name: e.currentTarget.value,
                    }))
                  }
                />
              </div>
              <div className="">
                <Textarea
                  defaultValue={editedTeam.team_desc}
                  size="lg"
                  labelPlacement="outside"
                  label="Team Description"
                  placeholder="Enter team description"
                  classNames={{
                    label: ["dark:text-white", "text-light_mode_text"],
                    inputWrapper: [
                      "dark:bg-light_hash",
                      "bg-light_mode_secondary",
                      "dark:data-[hover=true]:bg-hash_two",
                      "data-[hover=true]:bg-light_mode_tertiary",
                      "dark:group-data-[focus=true]:bg-hash_two",
                      "group-data-[focus=true]:bg-light_mode_tertiary",
                    ],
                    innerWrapper: ["focus-within:bg-red-500"],
                    input: ["text-medium", "font-poppins"],
                  }}
                  onChange={(e) =>
                    setEditedTeam((prev) => ({
                      ...prev,
                      team_desc: e.currentTarget.value,
                    }))
                  }
                />
              </div>
              <Button onClick={formSubmitHandler} type="button">
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
