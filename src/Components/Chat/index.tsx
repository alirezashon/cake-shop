// /** @format */

// // components/ChatUI.tsx

// import { useEffect, useState } from 'react'
// import { FaRocketchat } from 'react-icons/fa'
// import styles from './index.module.css'
// import { GiCrossMark } from 'react-icons/gi'
// import { MessageInterface, Chat } from '@/Interfaces'
// import { sendMessage } from './handler'
// import io, { Socket } from 'socket.io-client'

// const ChatUI = () => {
//   const [showChat, setShowChat] = useState(false)
//   const [messages, setMessages] = useState<MessageInterface | null>(null)
//   const [newMessage, setNewMessage] = useState('')
//   const [socket, setSocket] = useState<Socket | null>(null)
//   useEffect(() => {
//     const socketIo: Socket = io('http://localhost:3872', {
//       path: '/api/chat',
//     })

//     setSocket(socketIo)

//     socketIo.on('connect', () => {
//       console.log('Connected to Socket.IO server')
//     })

//     socketIo.on(
//       'message',
//       (data: { client: string; newMessage: MessageInterface }) => {
//         setMessages((prev) => {
//           if (prev === null) return null
//           const newmessage: Chat = {
//             content: newMessage,
//             sender: '*u&$e#',
//             time: Date(),
//           }

//           return {
//             ...prev,
//             chats: [...prev.chats, newmessage],
//           }
//         })
//       }
//     )

//     socketIo.on('disconnect', () => {
//       console.log('Disconnected from Socket.IO server')
//     })

//     return () => {
//       socketIo.disconnect()
//     }
//   }, [])
//   const send = () => {
//     if (socket) {
//       socket.emit('sendMessage', {
//         authType: '&M%e$A#g$e#I%n&Z*',
//         message: newMessage,
//         client: messages?.client
//           ? messages?.client
//           : JSON.parse(localStorage.getItem('*c(h)o&m%a^c$H#a#p@') || ''),
//         // Replace with the actual client ID
//       })
//       setNewMessage('')
//     }
//   }
//   // const send = () => {
//   //   sendMessage(
//   //     newMessage,
//   //     messages?.client
//   //       ? messages?.client
//   //       : JSON.parse(localStorage.getItem('*c(h)o&m%a^c$H#a#p@') || '')
//   //   )
//   //   setMessages((prev) => {
//   //     if (prev === null) return null
//   //     const newmessage: Chat = {
//   //       content: newMessage,
//   //       sender: '*u&$e#',
//   //       time: Date(),
//   //     }

//   //     return {
//   //       ...prev,
//   //       chats: [...prev.chats, newmessage],
//   //     }
//   //   })
//   // }
//   const getHistory = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem('*c(h)o&m%a^c$H#a#p@') || '')
//       const response = await fetch('/api/chat/GET', {
//         headers: { 'Content-Type': 'application/json' },
//         method: 'POST',
//         body: JSON.stringify({
//           authType: '!C#o$N%e^C&t*O$C#h$t%',
//           client: user,
//         }),
//       })
//       const data = await response.json()
//       if (response.status === 200) {
//         console.log(data.messages)
//         console.log(setMessages(data.messages))
//       }
//       if (response.status === 207) {
//         user.length < 0 &&
//           localStorage.setItem('*c(h)o&m%a^c$H#a#p@', JSON.stringify(data.user))
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   }
//   useEffect(() => {
//     !messages && getHistory()
//   }, [])

//   return (
//     <div className={styles.chatContainer}>
//       {newMessage}
//       {!showChat && (
//         <div
//           className={styles.chatIcon}
//           onClick={() => setShowChat((prev) => !prev)}
//         >
//           <FaRocketchat size={'5vh'} />
//         </div>
//       )}
//       {showChat && (
//         <div className={styles.chatBox}>
//           <div className={styles.header}>
//             <GiCrossMark
//               className={styles.cross}
//               size={'5vh'}
//               onClick={() => setShowChat(false)}
//             />
//           </div>
//           <div className={styles.messages}>
//             {messages?.chats?.map((message) => (
//               <div
//                 key={message.sender}
//                 className={`${styles.message} ${
//                   message.sender === '*u&$e#'
//                     ? styles.userMessage
//                     : styles.otherMessage
//                 }`}
//               >
//                 {message.content}
//               </div>
//             ))}
//           </div>
//           <div className={styles.inputContainer}>
//             <button onClick={send} className={styles.sendButton}>
//               ارسال
//             </button>
//             <input
//               type='text'
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && send()}
//               placeholder='...ارسال پیام'
//               className={styles.input}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ChatUI

// components/ChatUI.tsx

import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { FaRocketchat } from 'react-icons/fa'
import { GiCrossMark } from 'react-icons/gi'
import styles from './index.module.css'
import { MessageInterface, Chat } from '@/Interfaces'

const ChatUI = () => {
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<MessageInterface | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const socketIo: Socket = io(`http://localhost:${process.env.PRODUCTION_PORT}`, {
      path: '/api/socket',
    })

    setSocket(socketIo)

    socketIo.on('connect', () => {
      console.log('Connected to Socket.IO server')
    })

    socketIo.on('message', (data: { client: string; newMessage: Chat }) => {
      setMessages((prev) => {
        if (prev === null) return null
        return {
          ...prev,
          chats: [...prev.chats, data.newMessage],
        }
      })
    })

    socketIo.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server')
    })

    return () => {
      socketIo.disconnect()
    }
  }, [])

  const send = () => {
    if (socket) {
      socket.emit('sendMessage', {
        authType: '&M%e$A#g$e#I%n&Z*',
        message: newMessage,
        client:
          messages?.client ||
          JSON.parse(localStorage.getItem('*c(h)o&m%a^c$H#a#p@') || ''),
      })
      setNewMessage('')
    }
  }

  const getHistory = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('*c(h)o&m%a^c$H#a#p@') || '')
      const response = await fetch('/api/chat/GET', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          authType: '!C#o$N%e^C&t*O$C#h$t%',
          client: user,
        }),
      })
      const data = await response.json()
      if (response.status === 200) {
        setMessages(data.messages)
      } else if (response.status === 207) {
        if (user.length < 0) {
          localStorage.setItem('*c(h)o&m%a^c$H#a#p@', JSON.stringify(data.user))
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!messages) getHistory()
  }, [messages])

  return (
    <div className={styles.chatContainer}>
      {newMessage}
      {!showChat && (
        <div
          className={styles.chatIcon}
          onClick={() => setShowChat((prev) => !prev)}
        >
          <FaRocketchat size={'5vh'} />
        </div>
      )}
      {showChat && (
        <div className={styles.chatBox}>
          <div className={styles.header}>
            <GiCrossMark
              className={styles.cross}
              size={'5vh'}
              onClick={() => setShowChat(false)}
            />
          </div>
          <div className={styles.messages}>
            {messages?.chats?.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  message.sender === '*u&$e#'
                    ? styles.userMessage
                    : styles.otherMessage
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>
          <div className={styles.inputContainer}>
            <button onClick={send} className={styles.sendButton}>
              ارسال
            </button>
            <input
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder='...ارسال پیام'
              className={styles.input}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatUI
