/** @format */

// components/ChatUI.tsx

import { useEffect, useState } from 'react'
import { FaRocketchat } from 'react-icons/fa'
import styles from './index.module.css'
import { GiCrossMark } from 'react-icons/gi'
import { MessageInterface, Chat } from '@/Interfaces'
import { sendMessage } from './handler'
import { useSocket } from '@/Context/Socket'

const ChatUI = () => {
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<MessageInterface | null>(null)
  const [newMessage, setNewMessage] = useState('')

  const { socket } = useSocket()

  useEffect(() => {
    if (socket) {
      socket.on(
        'message',
        (data: { client: string; newMessage: MessageInterface }) => {
          setMessages((prev) => {
            if (prev === null) return null
            const newmessage: Chat = {
              content: newMessage,
              sender: '*u&$e#',
              time: Date(),
            }

            return {
              ...prev,
              chats: [...prev.chats, newmessage],
            }
          })
        }
      )
    }

    return () => {
      if (socket) {
        socket.off('message')
      }
    }
  }, [socket])

  const sendMessage = () => {
    if (socket) {
      socket.emit('sendMessage', {
        authType: '&M%e$A#g$e#I%n&Z*',
        message: newMessage,
        client: 'client_id_here',
      })
      setNewMessage('')
    }
  }

  const send = () => {
    // sendMessage(
    //   newMessage,
    //   messages?.client
    //     ? messages?.client
    //     : JSON.parse(localStorage.getItem('*c(h)o&m%a^c$H#a#p@') || '')
    // )
    setMessages((prev) => {
      if (prev === null) return null
      const newmessage: Chat = {
        content: newMessage,
        sender: '*u&$e#',
        time: Date(),
      }

      return {
        ...prev,
        chats: [...prev.chats, newmessage],
      }
    })
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
        console.log(data.messages)
        console.log(setMessages(data.messages))
      }
      if (response.status === 207) {
        user.length < 0 &&
          localStorage.setItem('*c(h)o&m%a^c$H#a#p@', JSON.stringify(data.user))
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    !messages && getHistory()
  }, [])

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
            {messages?.chats?.map((message) => (
              <div
                key={message.sender}
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
