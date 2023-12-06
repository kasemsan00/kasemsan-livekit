"use client";

import "@livekit/components-styles";
import { Chat, LiveKitRoom, PreJoin, RoomAudioRenderer, VideoConference } from "@livekit/components-react";
import { getToken } from "@/request";
import { useState } from "react";
import { useParams } from "next/navigation";
import "../../globals.css";

export default function Room() {
  const params = useParams();
  const [token, setToken] = useState("");

  const initToken = async (data: any) => {
    const resp = await getToken({ room: params.room + "", username: data.username });
    setToken(resp + "");
  };

  const handlePreJoin = (data: any) => {
    console.log(data);
    initToken(data);
  };

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token + ""}
      serverUrl={process.env.NEXT_PUBLIC_LK_SERVER_URL}
      data-lk-theme="default"
      style={{ height: "100vh" }}
    >
      {token === "" ? (
        <PreJoin onSubmit={handlePreJoin} />
      ) : (
        <>
          <Chat />
          <VideoConference />
          <RoomAudioRenderer />
        </>
      )}
    </LiveKitRoom>
  );
}
