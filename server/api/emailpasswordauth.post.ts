import { auth, signInWithEmailAndPassword } from "~/firebase";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  return user;
});
