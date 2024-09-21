import { auth, database, FieldValue } from "~/firebase/serverside";
import { ChatHistory } from "~/utils/types";

export default defineEventHandler(async (event) => {
  const cookies = getCookie(event, "session");

  if (cookies) {
    const claims = await auth.verifySessionCookie(cookies);
    const {
      chatFragment,
      chatId,
      chatSummary,
    }: { chatFragment: ChatHistory; chatId: string; chatSummary: string } =
      await readBody(event);

    if (claims && chatId.slice(0, -6) === claims.sub) {
      const databaseReference = database
        .collection("userdata")
        .doc(claims.email as string);

      if (chatSummary) {
        databaseReference.update({
          [`chats.${chatId}`]: {
            summary: chatSummary,
            messages: chatFragment,
          },
        });
      } else {
        databaseReference.update({
          [`chats.${chatId}.messages`]: FieldValue.arrayUnion(...chatFragment),
        });
      }

      return { message: "Chat Saved" };
    }
  }
});
