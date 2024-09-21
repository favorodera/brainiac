export default async function (prompt: string) {
  const textarea = document.querySelector("textarea");
  const chatBubbles = document.querySelector(".chat-bubbles");
  const brainiac = await useBrainiac();
  const isNewChat = useIsNewChat();
  const isBrainiacRunning = await useIsBrainiacRunning();
  let temporaryPromptHolder = "";

  if (!prompt) return;

  if (textarea) {
    temporaryPromptHolder = textarea.value;
    textarea.value = "";
  }

  isNewChat.value =
    useRoute().path === "/chat" || useRoute().path === "/chat/" ? true : false;

  if (isNewChat.value) {
    const redirect = await $fetch("/api/generatechatid", { method: "GET" });
    await navigateTo(`/chat/${redirect}`);
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

    isNewChat.value = false;

    return;
  } catch (error) {
    isBrainiacRunning.value = false;

    if (isNewChat) navigateTo("/chat");

    brainiac.value.pop();

    if (textarea) textarea.value = temporaryPromptHolder;

    return error;
  }
}
