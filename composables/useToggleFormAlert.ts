import useTogglerStore from "~/store/toggler";

export const useToggleFormAlert = () => {
  let { isFormAlertOpen } = useTogglerStore();
  isFormAlertOpen = !isFormAlertOpen;
  return { isFormAlertOpen };
};
