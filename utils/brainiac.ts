const textarea = document?.querySelector("textarea");
let temporary = "";
let chatID = "";

export default async function (prompt: string) {
  if (!prompt) return;

  if (textarea) {
    temporary = textarea.value;
    textarea.value = "";
  }

  if (useRoute().path === "/chat" || useRoute().path === "/chat/") {
    const redirect = await $fetch("/api/chatid", { method: "GET" });
    await navigateTo(`/chat/${redirect}`);
  }

  try {
    (await useBrainiac())?.value.push({
      role: "user",
      parts: [{ text: prompt }],
    });

    const newChat =
      useRoute().path === "/chat" || useRoute().path === "/chat/"
        ? true
        : false;

    setTimeout(() => {
      chatID = useRoute().path.split("/")[2];
    }, 2000);

    const response = await $fetch("/api/brainiac", {
      method: "POST",
      body: JSON.stringify({ prompt: prompt, newChat: newChat }),
    });

    if (response) {
      (await useBrainiac()).value.push({ role: 'model', parts: [{ text: response }] })
    }

    temporary = "";

    if (newChat) {
      const summary = await $fetch("/api/summary", {
        method: "POST",
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      await $fetch("/api/chatdata", {
        method: "PATCH",
        body: JSON.stringify({
          chatID: chatID,
          summary: summary,
          chatFragment: [
            { role: "user", parts: [{ text: prompt }] },
            { role: "model", parts: [{ text: response }] },
          ],
        }),
      });
    } else {
      await $fetch("/api/chatdata", {
        method: "PATCH",
        body: JSON.stringify({
          chatID: chatID,
          chatFragment: [
            { role: "user", parts: [{ text: prompt }] },
            { role: "model", parts: [{ text: response }] },
          ],
        }),
      });
    }

    return (await useBrainiac()).value;
  } catch (error) {
    (await useBrainiac()).value.pop();

    if (textarea) textarea.value = temporary;

    return error;
  }
}
