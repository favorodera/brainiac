import { database, auth } from "~/firebase/serverside";

export default defineEventHandler(async (event) => {
  const { idToken, name }: { idToken: string; name: string } = await readBody(
    event
  );

  try {
    await auth.verifyIdToken(idToken);

    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });

    setCookie(event, "session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    const decodedClaims = await auth.verifySessionCookie(sessionCookie);

    const userdata = await database
      .collection("userdata")
      .doc(decodedClaims.email!)
      .get();

    if (!userdata.exists) {
      await database
        .collection("userdata")
        .doc(decodedClaims.email!)
        .create({
          personalinfo: {
            name: name,
            email: decodedClaims.email,
            photo: decodedClaims.picture,
            uid: decodedClaims.sub,
            verified: decodedClaims.email_verified,
          },
          chats: {},
        });
    } else {
      if (
        !userdata.data()?.personalinfo.name ||
        !userdata.data()?.personalinfo.photo
      ) {
        await userdata.ref.update({
          "personalinfo.name": name || userdata.data()?.personalinfo.name,
          "personalinfo.photo":
            userdata.data()?.personalinfo.photo || decodedClaims.picture,
        });
      }
    }

    return { message: "Authentication Successful" };
  } catch (error) {
    return error;
  }
});
