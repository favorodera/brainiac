import { auth, database, FieldValue } from '~/firebase/serverside'
import { ChatHistory } from '~/utils/types'

export default defineEventHandler(async (event) => {
  const requestType = event.method
  const cookies = getCookie(event, 'session')

  if (cookies) {
    const claims = await auth.verifySessionCookie(cookies)

    if (requestType === 'PATCH') {
      const { chatFragment, chatID, summary }: { chatFragment: ChatHistory; chatID: string; summary: string } = await readBody(event)

      if (chatID?.slice(0, -6) === claims?.sub) {

        if (summary) {
          await database
            .collection('userdata')
            .doc(claims?.email as string)
            .update({
              [`chats.${chatID}`]: {
                summary: summary,
                messages: FieldValue.arrayUnion(...chatFragment),
              },
            })
        }
        else {
          await database
            .collection('userdata')
            .doc(claims?.email as string)
            .update({
              [`chats.${chatID}.messages`]: FieldValue.arrayUnion(...chatFragment),

            })
        }

        return { message: 'Chat data saved successfully' }
      }
    }else if (requestType === 'GET') {
      if (claims?.sub) {
        const chatData = await database
          .collection('userdata')
          .doc(claims?.email as string)
          .get()

        return chatData.data()?.chats
      }
    }
  }
})
