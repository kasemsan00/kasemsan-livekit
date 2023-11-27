export const getToken = async ({ room }: { room: string }) => {
  const res = await fetch(`https://video-api.kasemsan.net/getToken?room=${room}`, {});
  if (res.ok) {
    return await res.text();
  }
  return false;
};
