import { useRef, useState, useEffect } from 'react'
import styles from './index.module.css'
import List from './List'
import { Toast } from 'primereact/toast'
import { Chat, MessageInterface } from '@/Interfaces'
import { io, Socket } from 'socket.io-client'
import { GiCrossMark } from 'react-icons/gi'

const ChatsManager: React.FC = () => {
  const toast = useRef<Toast>(null)

  const [chats, setChats] = useState<MessageInterface[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [newMessage, setNewMessage] = useState<string>('')
  const [socket, setSocket] = useState<Socket | null>(null)
  const [client, setClient] = useState<string | null>(null)

  useEffect(() => {
    const socketIo: Socket = io({
      path: '/api/socket',
    })
    setSocket(socketIo)

    socketIo.on('connect', () => {
      console.log('Admin connected to the socket for chat')
    })

    socketIo.on('message', (data: { client: string; newMessage: Chat }) => {
      setChats((prevChats) =>
        prevChats
          ? prevChats.map((chat) =>
              chat.client === data.client
                ? { ...chat, chats: [...chat.chats, data.newMessage] }
                : chat
            )
          : null
      )
    })

    socketIo.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server')
    })

    return () => {
      socketIo.disconnect()
    }
  }, [])

  const send = () => {
    if (socket && client) {
      socket.emit('sendMessage', {
        authType: '^a&M&d(i*n^a$t%0#l$N(b)i*',
        message: newMessage,
        client,
      })

      setNewMessage('')
    }
  }

  const getData = async () => {
    try {
      const response = await fetch('/api/data/Post/Admin/Chats/GET', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authType: '&c*h^A%t$m^a#t%o$k@a!l&i^',
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setChats(result.chats)
        setIsLoading(false)
      } else {
        toast.current?.show({
          severity: 'error',
          summary: 'Secondary',
          detail: 'نا موفق',
          life: 3000,
        })
        setIsLoading(false)
      }
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Secondary',
        detail: 'نا موفق',
        life: 3000,
      })
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!chats) {
      getData()
    }
  }, [chats])

  return (
    <>
      <Toast ref={toast} />
      <div className={styles.container}>
        <List data={chats} isLoading={isLoading} setClient={setClient} />
        {client && (
          <div className={styles.chatBox}>
            <div className={styles.header}>
              <GiCrossMark
                className={styles.cross}
                size={'5vh'}
                onClick={() => setClient(null)}
              />
            </div>
            <div className={styles.messages}>
              {chats &&
                chats
                  .find((d) => d.client === client)
                  ?.chats?.map((message, index) => (
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
    </>
  )
}

export default ChatsManager

// import { useRef, useState, useEffect } from 'react'
// import styles from './index.module.css'
// import List from './List'
// import { Toast } from 'primereact/toast'
// import { Chat, MessageInterface } from '@/Interfaces'
// import io, { Socket } from 'socket.io-client'
// import { GiCrossMark } from 'react-icons/gi'
// const ChatsManager: React.FC = () => {
//   const toast = useRef<Toast>(null)

//   const [chats, setChats] = useState<MessageInterface[] | null>(null)
//   const [isLoading, setIsLoading] = useState<boolean>(true)
//   const [newMessage, setNewMessage] = useState<string>('')
//   const [socket, setSocket] = useState<Socket | null>(null)
//   const [client, setClient] = useState<string | null>(null)
//   useEffect(() => {
//     const socketIo: Socket = io(
//       `http://localhost:${process.env.PRODUCTION_PORT}`,
//       {
//         path: '/api/data/Post/Admin/Chat',
//       }
//     )
//     setSocket(socketIo)
//     socketIo.on('connect', () => {
//       console.log('admin connected to the socket for chat')
//     })

//     socketIo.on('message', (data: { client: string; newMessage: Chat }) => {
//       setChats((prevChats) =>
//         prevChats
//           ? prevChats.map((chat) =>
//               chat.client === data.client
//                 ? { ...chat, chats: [...chat.chats, data.newMessage] }
//                 : chat
//             )
//           : null
//       )
//     })

//     socketIo.on('disconnect', () => {
//       console.log('Disconnected from Socket.IO server')
//     })

//     return () => {
//       socketIo.disconnect()
//     }
//   }, [])

//   const send = () => {
//     if (socket) {
//       socket.emit('sendResponse', {
//         authType: '&M&d(i*n^a$t%0#l$N(b)i*',
//         message: newMessage,
//         client,
//       })
//       setNewMessage('')
//     }
//   }
//   const getData = async () => {
//     try {
//       const response = await fetch('/api/data/Post/Admin/Chats/GET', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           authType: '&c*h^A%t$m^a#t%o$k@a!l&i^',
//         }),
//       })

//       if (response.ok) {
//         const result = await response.json()
//         setChats(result.chats)
//         setIsLoading(false)
//       } else {
//         toast.current?.show({
//           severity: 'error',
//           summary: 'Secondary',
//           detail: ' نا موفق',
//           life: 3000,
//         })
//         setIsLoading(false)
//       }
//     } catch (error) {
//       toast.current?.show({
//         severity: 'error',
//         summary: 'Secondary',
//         detail: ' نا موفق',
//         life: 3000,
//       })
//       setIsLoading(false)
//     }
//   }
//   useEffect(() => {
//     !chats && getData()
//   }, [chats])

//   return (
//     <>
//       <Toast ref={toast} />
//       <div className={styles.container}>
//         <List data={chats} isLoading={isLoading} setClient={setClient} />
//         {client && (
//           <div className={styles.chatBox}>
//             <div className={styles.header}>
//               <GiCrossMark
//                 className={styles.cross}
//                 size={'5vh'}
//                 onClick={() => setClient(null)}
//               />
//             </div>
//             <div className={styles.messages}>
//               {chats &&
//                 chats[chats.findIndex((d) => d.client === client)]?.chats?.map(
//                   (message, index) => (
//                     <div
//                       key={index}
//                       className={`${styles.message} ${
//                         message.sender === '*u&$e#'
//                           ? styles.userMessage
//                           : styles.otherMessage
//                       }`}
//                     >
//                       {message.content}
//                     </div>
//                   )
//                 )}
//             </div>
//             <div className={styles.inputContainer}>
//               <button onClick={send} className={styles.sendButton}>
//                 ارسال
//               </button>
//               <input
//                 type='text'
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && send()}
//                 placeholder='...ارسال پیام'
//                 className={styles.input}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   )
// }

// export default ChatsManager
