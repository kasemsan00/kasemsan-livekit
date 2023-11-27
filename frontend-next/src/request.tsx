export const getToken = async ({ room, username }: { room: string; username: string }) => {
  const res = await fetch(`https://video-api.kasemsan.net/getToken?room=${room}&username=${username}`, {});
  if (res.ok) {
    return await res.text();
  }
  return false;
};
