import { auth, createUserWithEmailAndPassword } from "~/firebase";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
});
