export default defineEventHandler(async (event) => {
  deleteCookie(event, 'session', {
    path: '/', 
    httpOnly: true, 
    secure: true, 
    sameSite: 'none', 
  })
  return { message: 'Signed Out Successfully' }
})
