/**
 * Signs out the current user from the application.
 *
 * This function sends a DELETE request to the '/api/signout' endpoint,
 * which handles the server-side sign-out process.
 */
export default async function () {
  // Send a DELETE request to the '/api/signout' endpoint
  await $fetch('/api/signout', { method: 'DELETE' })
}
