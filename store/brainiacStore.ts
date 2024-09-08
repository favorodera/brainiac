const useBrainiacStore = defineStore("brainiac", () => {
  const prompt = ref("");

  return {
    prompt,
  };
});

export default useBrainiacStore;
