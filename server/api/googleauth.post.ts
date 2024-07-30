import { signInWithPopup, provider, auth } from "~/firebase";

export default defineEventHandler(async (event) => {
  const { user } = await signInWithPopup(auth, provider);
  return user;
});
