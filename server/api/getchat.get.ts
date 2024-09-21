import { auth, database } from "~/firebase/serverside";

export default defineEventHandler(async (event) => {
  const { chatId }: { chatId: string } = await getQuery(event);
  const cookies = getCookie(event, "session");

  try {
    if (cookies) {
      const claims = await auth.verifySessionCookie(cookies);

      if (claims) {
        const chatData = await database
          .collection("userdata")
          .doc(claims.email as string)
          .get();

        return chatId
          ? chatData.data()?.chats[chatId].messages
          : chatData.data()?.chats;
      }
    }
  } catch (error) {
    return "Error Fetching Chats";
  }
});
