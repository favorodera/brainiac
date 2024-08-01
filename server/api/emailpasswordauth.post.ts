import { auth, signInWithEmailAndPassword } from "~/firebase";

export default defineEventHandler(async (event) => {
  const status = getResponseStatus(event);
  const { email, password } = await readBody(event);
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  return { user, status };
});
