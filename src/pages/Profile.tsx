import { test_img } from "@/assets";
import { Button } from "@components/custom/Button";
import { Input } from "@components/custom/Input";
import { Textarea } from "@nextui-org/react";
import { ChangeEvent, FC, useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";

enum BasicInfoFields {
  name,
  gender,
  birthday,
  summary,
  avatar,
}

export const Profile: FC = () => {
  const [editField, setEditField] = useState<BasicInfoFields | null>(null);
  const avatarInput = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<null | File>(null);

  const editAvatarHandler = () => {
    if (editField === null) setEditField(BasicInfoFields.avatar);
    avatarInput.current!.click();
  };

  const avatarInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) setAvatar(e.currentTarget.files[0]);
  };
  return (
    <div className="text-white px-16 py-12">
      <div className="px-14 flex items-center bg-hash_one bg-opacity-20 w-full h-[400px]">
        <div className="flex gap-10">
          <div
            onClick={editAvatarHandler}
            className="relative flex flex-col  group cursor-pointer"
          >
            <input
              onChange={avatarInputChangeHandler}
              ref={avatarInput}
              hidden
              type="file"
            />
            <img
              className="w-[200px] group-hover:opacity-50 h-[200px] object-cover rounded-2xl border-[7px] border-light_hash"
              src={`${avatar ? URL.createObjectURL(avatar) : test_img}`}
              alt=""
            />
            {editField === BasicInfoFields.avatar && (
              <div className="flex gap-3">
                <Button>save</Button>
                <Button onClick={() => setEditField(null)}>cancel</Button>
              </div>
            )}
            <div className="scale-0 group-hover:scale-100 absolute flex flex-col items-center right-[50%] top-[50%] translate-x-[50%] translate-y-[-50%]">
              <FiCamera size="50" />
              <span>Edit</span>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-poppins">Nargees</h2>
            <span className="text-large font-poppins text-slate-300">
              nargees@mine.com
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
                  <span className="text-xl">Asharudeen Ali KT</span>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Input defaultValue="Asharudeen Ali KT" />
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
                  <span className="text-xl">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit consequatur porro, commodi doloremque, optio facere
                    soluta quos dignissimos velit, at perspiciatis quibusdam
                    placeat explicabo eius minima sunt nulla! Deserunt,
                    voluptatum? Harum repudiandae exercitationem ab temporibus
                    sequi totam laudantium, quam eligendi, ipsam iste nulla vero
                    sint iusto ipsa! Natus aliquid tempore repellat eum
                    perferendis numquam, ad at, explicabo eos non aut.
                  </span>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Textarea
                      className="text-black"
                      defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit consequatur porro, commodi doloremque, optio facere
                    soluta quos dignissimos velit, at perspiciatis quibusdam
                    placeat explicabo eius minima sunt nulla! Deserunt,
                    voluptatum? Harum repudiandae exercitationem ab temporibus
                    sequi totam laudantium, quam eligendi, ipsam iste nulla vero
                    sint iusto ipsa! Natus aliquid tempore repellat eum
                    perferendis numquam, ad at, explicabo eos non aut.
                    "
                    />
                    <div className="flex gap-2">
                      <Button>save</Button>
                      <Button onClick={() => setEditField(null)}>cancel</Button>
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
