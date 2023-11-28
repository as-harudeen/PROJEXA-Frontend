import { noProfileImg } from "@/assets";
import { Input } from "@components/custom/Input";
import { useZodForm } from "@hooks/useZodForm";
import { Textarea } from "@nextui-org/react";
import { teamSchema } from "@/utils/zodValidator";
import { FC, useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { Button } from "@components/custom/Button";

export const InitiateTeam: FC = () => {
  const [teamDp, setTeamDp] = useState<File | null>(null);
  const dpInputRef = useRef<HTMLInputElement>(null);

  const { errors, register, handleSubmit, reset } = useZodForm<{
    team_name: string;
    team_desc: string;
  }>(teamSchema);

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

  const formSubmitHandler = async ({
    team_name,
    team_desc,
  }: {
    team_name: string;
    team_desc: string;
  }) => {
    const formData = new FormData();
    formData.append("team_name", team_name);
    formData.append("team_desc", team_desc);
    formData.append("team_dp", teamDp || "");
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}team`, {
      method: "POST",
      body: formData,
      credentials: "include"
    });
    if (res.ok) {
      reset();
      setTeamDp(null);
      dpInputRef.current!.value = "";
      toast.success("Team Initaited");
    }
  };

  useEffect(() => {
    if (errors.team_desc)
      toast.error("Team description should be at least 10 letter");
    if (errors.team_name)
      toast.error("Team name should be more than 3 character");
  }, [errors.team_name, errors.team_desc]);

  return (
    <div className="text-light_mode_text dark:text-white px-16 py-12 font-poppins">
      <div className="mb-10">
        <h2 className="font-semibold text-2xl">Initiate Team</h2>
      </div>
      <div className="w-full bg-light_mode_primary dark:bg-dark_hash">
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <div className="flex gap-5 p-6">
            <div className="relative">
              {teamDp && (
                <div
                  onClick={dpRemoveButtonClickHandler}
                  className="absolute right-[-4px] top-[-4px] bg-red-500 p-1 rounded-md cursor-pointer"
                >
                  <AiOutlineDelete size="18" />
                </div>
              )}
              <input
                onChange={dpInputOnChangeHandler}
                ref={dpInputRef}
                type="file"
                hidden
              />
              <img
                onClick={dpOnClickHandler}
                className="w-[200px] h-[200px] object-cover rounded-2xl"
                src={teamDp ? URL.createObjectURL(teamDp) : noProfileImg}
                alt=""
              />
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <div>
                <Input
                  {...register("team_name")}
                  size="xl"
                  labelPlacement="outside"
                  label="Team Name"
                  placeholder="Enter team name"
                  color="hash"
                />
              </div>
              <div className="">
                <Textarea
                  {...register("team_desc")}
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
                />
              </div>
              <Button type="submit">Initiate</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
