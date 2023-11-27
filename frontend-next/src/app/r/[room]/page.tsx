"use client";

import "@livekit/components-styles";
import { ControlBar, GridLayout, LiveKitRoom, ParticipantTile, RoomAudioRenderer, useTracks, VideoConference } from "@livekit/components-react";
import { getToken } from "@/request";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "../../globals.css";

export default function Room() {
  const params = useParams();
  const [token, setToken] = useState("");

  useEffect(() => {
    const initToken = async () => {
      const resp = await getToken({ room: params.room + "" });
      setToken(resp + "");
    };
    initToken().then((r) => r);
  }, [params.room]);

  if (token === "") {
    return "";
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LK_SERVER_URL}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ height: "100vh" }}
    >
      <VideoConference />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
}
