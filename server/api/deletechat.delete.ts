import { auth, database, FieldValue } from "~/firebase/serverside";

export default eventHandler(async (event) => {
  const { chatID }: { chatID: string } = await getQuery(event);
  const cookies = getCookie(event, "session");

  if (cookies) {
    const claims = await auth.verifySessionCookie(cookies);

    if (claims) {
      const chatData = database
        .collection("userdata")
        .doc(claims?.email as string);

      chatID && chatID.slice(0, -6) === claims?.sub
        ? await chatData.update({
            [`chats.${chatID}`]: FieldValue.delete(),
          })
        : await chatData.update({
            [`chats`]: FieldValue.delete(),
          });

      return { message: "Chat Deleted Successfully" };
    }
  }
});
