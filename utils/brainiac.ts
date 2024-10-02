import useBrainiacStore from "~/store/brainiacStore";

const brainiacStore = useBrainiacStore();

export default async function (prompt: string) {
  const chatBubbles = document.querySelector(".chat-bubbles");
  const brainiac = await useBrainiac();
  const isNewChat = useIsNewChat();
  const isBrainiacRunning = await useIsBrainiacRunning();
  let temporaryPromptHolder = "";

  if (!prompt) return;

  temporaryPromptHolder = brainiacStore.prompt;
  brainiacStore.prompt = "";

  isNewChat.value =
    useRoute().path === "/chat" || useRoute().path === "/chat/" ? true : false;

  if (isNewChat.value) {
    await $fetch("/api/generatechatid", { method: "GET" })
      .then((chatId) => {
        navigateTo(`/chat/${chatId}`, { replace: true });
      })
  }

  try {
    brainiac.value.push({
      role: "user",
      parts: [{ text: prompt }],
    });

    setTimeout(() => {
      chatBubbles?.scrollTo({
        top: chatBubbles.scrollHeight,
        behavior: "smooth",
      });
    }, 1000);

    isBrainiacRunning.value = true;

    const [response, chatSummary] = await Promise.all([
      $fetch("/api/brainiac", {
        method: "POST",
        body: JSON.stringify({
          prompt: prompt,
          isNewChat: isNewChat.value,
        }),
      }),
      isNewChat.value
        ? $fetch("/api/summary", {
            method: "POST",
            body: JSON.stringify({
              promptToBeSummarized: prompt,
            }),
          })
        : Promise.resolve(null),
    ]);

    isBrainiacRunning.value = false;
    brainiac.value.push({
      role: "model",
      parts: [{ text: response }],
    });

    await $fetch("/api/savechat", {
      method: "PATCH",
      body: JSON.stringify({
        chatId: useRoute().path.split("/")[2],
        chatSummary: chatSummary,
        chatFragment: [
          { role: "user", parts: [{ text: prompt }] },
          { role: "model", parts: [{ text: response }] },
        ],
      }),
    });
  } catch (error) {
    isBrainiacRunning.value = false;
    brainiac.value.pop();
    if (isNewChat) await navigateTo("/chat");

    brainiacStore.prompt = temporaryPromptHolder;

    return error;
  }
}
