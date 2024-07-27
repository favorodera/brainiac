import { defineStore } from "pinia";

const useTogglerStore = defineStore("toggler", () => {
  const isFormAlertOpen = ref(false);

  return { isFormAlertOpen };
});

export default useTogglerStore;
