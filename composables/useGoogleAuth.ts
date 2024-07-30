export const useGoogleAuth = async () => {
  const user = await $fetch("/api/googleauth", {
    method: "POST",
  });

  return user;
};
