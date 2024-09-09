const textarea = document?.querySelector("textarea");
let temporary = "";

export default async function (prompt: string) {
  if (!prompt) return;

  // Save the current textarea value if it exists
  if (textarea) {
    temporary = textarea.value;
    textarea.value = "";
  }

  // Check if this is a new chat by checking the route
  const newChat =
    useRoute().path === "/chat" || useRoute().path === "/chat/" ? true : false;

  // If the user is on the /chat route, redirect to a new chat
  if (newChat) {
    const redirect = await $fetch("/api/generatechatid", { method: "GET" });
    await navigateTo(`/chat/${redirect}`);
  }

  try {
    // Push the user's prompt to the chat history
    (await useBrainiac())?.value.push({
      role: "user",
      parts: [{ text: prompt }],
    });

    // Send the prompt to the API
    const response = await $fetch("/api/brainiac", {
      method: "POST",
      body: JSON.stringify({ prompt: prompt, newChat: newChat }),
    });

    // If there is a response, push it to the chat history
    if (response) {
      (await useBrainiac()).value.push({
        role: "model",
        parts: [{ text: response }],
      });
    }

    // Restore the textarea value if it was saved
    temporary = "";

    // Save the chat
    if (newChat) {
      // Generate a summary for the new chat
      const summary = await $fetch("/api/summary", {
        method: "POST",
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      // Save the chat with the summary
      await $fetch("/api/savechat", {
        method: "PATCH",
        body: JSON.stringify({
          chatID: useRoute().path.split("/")[2],
          summary: summary,
          chatFragment: [
            { role: "user", parts: [{ text: prompt }] },
            { role: "model", parts: [{ text: response }] },
          ],
        }),
      });
    } else {
      // Save the chat without a summary
      await $fetch("/api/savechat", {
        method: "PATCH",
        body: JSON.stringify({
          chatID: useRoute().path.split("/")[2],
          chatFragment: [
            { role: "user", parts: [{ text: prompt }] },
            { role: "model", parts: [{ text: response }] },
          ],
        }),
      });
    }

    return (await useBrainiac()).value;
  } catch (error) {
    // Handle errors by removing the user's prompt from the chat history
    // and restoring the textarea value
    (await useBrainiac()).value.pop();

    if (textarea) textarea.value = temporary;

    return error;
  }
}
