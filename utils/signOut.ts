export default async function () {
  await $fetch('/api/signout', { method: 'DELETE' })
}
