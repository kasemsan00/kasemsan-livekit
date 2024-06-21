export const getToken = async ({ room, username }: { room: string; username: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getToken?room=${room}&username=${username}`, {});
  if (res.ok) {
    return await res.text();
  }
  return false;
};
