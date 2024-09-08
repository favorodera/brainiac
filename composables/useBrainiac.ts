import type { ChatHistory } from "~/utils/types";

const brainiac = ref<ChatHistory>([]);

export default async function () {
  return brainiac;
}
