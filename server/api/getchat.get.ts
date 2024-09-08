import { auth, database } from "~/firebase/serverside";

export default defineEventHandler(async (event) => {
  const { chatID }: { chatID: string } = await getQuery(event);
  const cookies = getCookie(event, "session");

  if (cookies) {
    const claims = await auth.verifySessionCookie(cookies);

    if (claims?.sub) {
      const chatData = await database
        .collection("userdata")
        .doc(claims?.email as string)
        .get();

      // If chatID is provided, return only the chat with that ID
      if (chatID) {
        return chatData.data()?.chats[chatID].messages;
      } else {
        // If no chatID, return all chats
        return chatData.data()?.chats;
      }
    }
  }
});
