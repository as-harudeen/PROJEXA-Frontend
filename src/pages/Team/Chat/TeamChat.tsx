import { Button } from "@components/custom/Button";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { Textarea } from "@nextui-org/react";
import { useSocket } from "@/context/useSocket";
import { noProfileImg } from "@/assets";

interface MessageInterface {
  chat_text: string;
  sended_at: Date;
  chatter: {
    user_id: string;
    user_name: string;
    user_profile: string;
  };
}

interface TeamVideoCallJoinDetails {
  from: {
    user_name: string;
    user_profile: string;
  };
  roomId: string;
}

export const TeamChat: FC = () => {
  const { team_id } = useParams();
  const messageInput = useRef<HTMLInputElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isSomeoneTyping, setIsSomeoneTyping] = useState<string | null>(null);
  const navigate = useNavigate();

  const user_id = useUserStore((state) => state.user?.user_id);
  const { socket } = useSocket();

  const [joinDetails, setJoinDetails] =
    useState<TeamVideoCallJoinDetails | null>(null);
  const [messages, setMessages] = useState<MessageInterface[]>([]);

  const handleVideoCallStarted = useCallback(
    (joinDetails: TeamVideoCallJoinDetails) => {
      setJoinDetails(joinDetails);
    },
    []
  );

  const handleVideoCallInited = useCallback(
    ({ roomId }: { roomId: string }) => {
      console.log("handle video call inited");
      navigate(`video-call/${roomId}`);
    },
    []
  );

  const handleTeamChatTyping = useCallback(
    ({ user_name }: { user_name: string }) => {
      setIsSomeoneTyping(user_name);

      setTimeout(() => {
        setIsSomeoneTyping(null);
      }, 2000);
    },
    []
  );


  useEffect(() => {
    socket.on("team:message:receive", (message: MessageInterface) => {
      console.log(message);
      setMessages((prev) => [...prev, message]);
    });

    socket.on("team:chats", (messages: MessageInterface[]) => {
      console.log(`Team chats, `);
      setMessages(messages);
    });

    socket.on("team:video-call:started", handleVideoCallStarted);
    socket.on("team:video-call:inited", handleVideoCallInited);
    // socket.on("team:video-call:user-joined", handleVideoCallUserJoined);
    socket.on("team:chat:typing", handleTeamChatTyping);
  }, [socket, handleVideoCallStarted, handleVideoCallInited]);

  useEffect(() => {
    socket.emit("team:chat:join", { team_id });
  }, []);

  const messageInputOnChangeHandler = () => {
    if (messageInput.current!.value) {
      if (!isTyping) setIsTyping(true);
      socket.emit("team:chat:typing", {team_id});
    } else {
      if (isTyping) setIsTyping(false);
    }
  };

  const sendButtonClickHandler = () => {
    const message_text = messageInput.current!.value;
    if (!message_text) return;
    const newMessage: MessageInterface = {
      chat_text: message_text,
      sended_at: new Date(),
      chatter: {
        user_id: user_id!,
        user_name: "",
        user_profile: "",
      },
    };
    setMessages((prev) => [...prev, newMessage]);
    socket.emit("team:message:send", { team_id, message: message_text });
    messageInput.current!.value = "";
  };

  const handleVideoCallInit = async () => {
    socket.emit("team:video-call:init", { team_id });
  };

  const handleVideoCallJoin = async () => {
    navigate(`video-call/${joinDetails?.roomId}`);
  };

  return (
    <div className="text-white px-16 py-6 flex flex-col justify-between min-h-screen">
      <div className="flex-1 flex flex-col gap-3 py-10 h-full">
        <div>
          <h2 className="font-medium text-2xl">Team Chat</h2>
        </div>
        {messages.map((message) => (
          <div
            className={`font-poppins bg-dark_hash px-4 py-2 w-[45%] rounded-xl ${
              message.chatter.user_id === user_id ? "self-end" : ""
            }`}
          >
            <div className="flex gap-3 items-center">
              <span className="font-medium text-medium ">
                {message?.chatter.user_id === user_id
                  ? "You"
                  : message.chatter.user_name}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="pt-2 text-lg">{message.chat_text}</span>
              <span className="self-end text-gray-400">
                {moment(message.sended_at).format("hh.mm A")}
              </span>
            </div>
          </div>
        ))}
        {isSomeoneTyping && (
          <div className="text-white h-[10px]">
            <div>
              <span>{isSomeoneTyping} is typing...</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2 items-center">
        <Textarea
          classNames={{
            inputWrapper: [
              "bg-opacity-30",
              "bg-light_hash",
              "group-data-[focus=true]:bg-opacity-20",
              "group-data-[hover=true]:bg-opacity-30",
              "pe-14",
            ],
            label: ["font-[500]", "font-poppins"],
            input: ["text-white", "text-lg", "font-poppins"],
          }}
          ref={messageInput}
          onChange={messageInputOnChangeHandler}
        />
        <div className="flex flex-col gap-2">
          <Button className="w-full" onClick={sendButtonClickHandler}>
            send
          </Button>
          <Button className="w-full" onClick={handleVideoCallInit}>
            Video call
          </Button>
        </div>
      </div>
      {joinDetails && (
        <div className="fixed flex gap-5 items-center justify-between bottom-3 right-10 px-6 py-3 bg-light_hash rounded-md">
          <div>
            <div>
              <img
                src={
                  joinDetails.from.user_profile
                    ? `${import.meta.env.VITE_BASE_URL}/${
                        joinDetails.from.user_profile
                      }`
                    : noProfileImg
                }
                className="w-[50px] h-[50px] object-cover rounded-full"
                alt=""
              />
            </div>
            <span className="font-medium font-poppins">
              {joinDetails.from.user_name} Initiated Video Call
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={handleVideoCallJoin}>Join</Button>
            <Button color="danger" onClick={() => setJoinDetails(null)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
