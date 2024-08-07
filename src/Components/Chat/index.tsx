import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { FaRocketchat } from 'react-icons/fa'
import { GiCrossMark } from 'react-icons/gi'
import styles from './index.module.css'
import { MessageInterface, Chat } from '@/Interfaces'

const ChatUI = () => {
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<MessageInterface | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [socket, setSocket] = useState<Socket | null>(null)

  const connectSocket = () => {
    const socketIo: Socket = io({
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
  }

  const send = () => {
    const messageObject: Chat = {
      sender: '*u&$e#',
      content: newMessage,
      time: new Date().toISOString(),
    }

    setMessages((prev) => {
      if (prev === null) return null
      return {
        ...prev,
        chats: [...prev.chats, messageObject],
      }
    })

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

  useEffect(() => {
    if (showChat && !socket) {
      connectSocket()
    }
  }, [showChat])

  return (
    <div className={styles.chatContainer}>
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
              placeholder={'ارسال پیام . . .'}
              className={styles.input}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatUI
