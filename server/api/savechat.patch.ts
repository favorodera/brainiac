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
    }: {
      chatFragment: ChatHistory;
      chatID: string;
      summary: string;
    } = await readBody(event);

    if (claims) {

      // Check if the userId in the chatId and the userId in the claims are the same
      if (chatID?.slice(0, -6) === claims?.sub) {

        // Check if summary is sent in the request indicating it is a new chat
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

        return { message: "Chat saved" };
      }

    }
  }
});
