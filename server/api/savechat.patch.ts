import { auth, database, FieldValue } from "~/firebase/serverside";
import { ChatHistory } from "~/utils/types";

export default defineEventHandler(async (event) => {
  const cookies = getCookie(event, "session");

  if (cookies) {
    const claims = await auth.verifySessionCookie(cookies);

    const {
      chatFragment,
      chatID,
      summary,
    }: { chatFragment: ChatHistory; chatID: string; summary: string } =
      await readBody(event);

    if (claims) {
      if (chatID?.slice(0, -6) === claims?.sub) {
        if (summary) {
          await database
            .collection("userdata")
            .doc(claims?.email as string)
            .update({
              [`chats.${chatID}`]: {
                summary: summary,
                messages: chatFragment,
              },
            });
        } else {
          await database
            .collection("userdata")
            .doc(claims?.email as string)
            .update({
              [`chats.${chatID}.messages`]: FieldValue.arrayUnion(
                ...chatFragment
              ),
            });
        }

        return { message: "Chat data saved successfully" };
      }
    }
  }
});
