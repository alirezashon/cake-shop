/** @format */

// components/ChatUI.tsx

import { useEffect, useState } from 'react'
import { FaRocketchat } from 'react-icons/fa'
import styles from './index.module.css'
import { GiCrossMark } from 'react-icons/gi'
import { Message } from '@/Interfaces'
import { getHistory, sendMessage } from './handler'

const ChatUI = () => {
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const dummyChatHistory: Message[] = [
    {
      id: '2',
      client: '',
      content: 'الکی مثلا یه مشکلی داشتم قبلا اینجا پیاماش مونده بوده باشه',
      sender: '*u&$e#',
    },
    {
      id: '1',
      client: '',
      content:
        'سلام در خدمت که خب آها باشه ردیفه مرسی که م خب آها باشه ردیفه مرسی که م خب آها باشه ردیفه مرسی که م خب آها باشه ردیفه مرسی که م خب آها باشه ردیفه مرسی که م خب آها باشه ردیفه مرسی که م خب آها باشه ردیفه مرسی که م خب آها باشه ردیفه مرسی که م خب آها باشه ردیفه مرسی که م خب آها باشه ردیفه مرسی که م خب آها باشه ردیفه مرسی که م خب آها باشه ردیفه مرسی که م خب آها باشه ردیفه مرسی که م خب آها باشه ردیفه مرسی که م خب آها باشه ردیفه مرسی که م خب آها باشه ردیفه مرسی که م خب آها باشه ردیفه مرسی که م خب آها باشه ردیفه مرسی که م خب آها باشه ردیفه مرسی که ممنون سپاسگذارتیم',
      sender: '&a(D^m$n@',
    },
  ]


  useEffect(() => {
 !messages&&getHistory()
  }, [])

  const toggleChat = () => {
    setShowChat((prev) => !prev)
  }

 
  return (
    <div className={styles.chatContainer}>
      {!showChat && (
        <div className={styles.chatIcon} onClick={toggleChat}>
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
            {messages?.map((message) => (
              <div
                key={message.id}
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
            <button onClick={()=> sendMessage(newMessage,messages[0]?.client?messages[0]?.client:JSON.parse(
    localStorage.getItem("#B!@%$&K&E^T*O(s&") || "[]"
  ))} className={styles.sendButton}>
              ارسال
            </button>
            <input
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' &&()=> sendMessage(newMessage,messages[0]?.client?messages[0]?.client:JSON.parse(
    localStorage.getItem("#B!@%$&K&E^T*O(s&") || "[]"
  ))} 
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
