const isAuthRunning = reactive({
  passwordauth: false,
  googleauth: false,
  signout: false,
  passwordreset: false,
  countdown:false
});

export default async function () {
  return isAuthRunning;
}