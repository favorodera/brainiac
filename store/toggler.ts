import { defineStore } from "pinia";

const useTogglerStore = defineStore("toggler", () => {
  const isAuthenticated = useState<boolean>("isAuthenticated", () => false);

  return { isAuthenticated };
});

export default useTogglerStore;
