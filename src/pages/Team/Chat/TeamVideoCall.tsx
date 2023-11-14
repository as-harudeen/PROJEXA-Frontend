import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt';


export const TeamVideoCall: FC = () => {
  const { room_id } = useParams();

  const navigate = useNavigate();

  const myMeeting = (element: HTMLDivElement) => {
    
      const appID = 548342593;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, room_id!, Date.now().toString(), 'achus');

      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
          container: element,
          scenario: {
              mode: ZegoUIKitPrebuilt.OneONoneCall
          },
          lowerLeftNotification: {
              showTextChat: true,
              showUserJoinAndLeave: true
          },
          onJoinRoom: () => {
              console.log("OnJoinRoom");
          },
          onUserJoin: (user) => {
              console.log(user);
          },
          onLeaveRoom: () => {
            console.log("hello leaved");
            navigate(-1);
          },
          showPreJoinView: false,
          layout: "Sidebar"
      })
  }

  return (
    <div ref={myMeeting}>
    </div>
  );
};
