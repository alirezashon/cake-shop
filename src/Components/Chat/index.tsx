/** @format */

// components/ChatUI.tsx

import { useEffect, useState } from "react"
import { FaRocketchat } from "react-icons/fa"
import styles from "./index.module.css"
import { GiCrossMark } from "react-icons/gi"

interface Message {
  id: string
  client: string
  content: string
  sender: "*u&$e#" | "&a(D^m$n@"
}

const ChatUI = () => {
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [client, setClient] = useState<string>("")
  // const dummyChatHistory: Message[] = [
  // 	{ id: 2, content: 'الکی مثلا یه مشکلی داشتم قبلا اینجا پیاماش مونده بوده باشه', sender: 'user' },
  // 	{ id: 1, content: 'سلام در خدمت که خب آها باشه ردیفه مرسی که ممنون سپاسگذارتیم', sender: 'other' },
  // ]
  // setMessages(dummyChatHistory)

  const fetchChatHistory = async () => {
    const response = await fetch("/api/chat/GET", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ authType: "&n)E(w*o&n$e^w#q@", client }),
    })
    const data = await response.json()
    data.messages && setMessages(data.messages)
  }

  useEffect(() => {
    // const name = JSON.parse(localStorage.getItem("user") || "")
    const name =`custom user ${Date}` 
	  !client && setClient(name)
    fetchChatHistory()
  }, [])

  const toggleChat = () => {
    setShowChat((prev) => !prev)
  }

  const sendMessage = async () => {
    console.log("messagooo")
    const response = await fetch("/api/chat", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        authType: "&M%e$A#g$e#I%n&Z*",
        message: newMessage,
        client: `${client}`,
      }),
    })
    console.log(await response.json())
    console.log(response.status)
  }

  return (
    <div className={styles.chatContainer}>
      {!showChat && (
        <div className={styles.chatIcon} onClick={toggleChat}>
          <FaRocketchat size={"5vh"} />
        </div>
      )}
      {showChat && (
        <div className={styles.chatBox}>
          <div className={styles.header}>
            <GiCrossMark
              className={styles.cross}
              size={"5vh"}
              onClick={() => setShowChat(false)}
            />
          </div>
          <div className={styles.messages}>
            {messages?.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${
                  message.sender === "*u&$e#"
                    ? styles.userMessage
                    : styles.otherMessage
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>
          <div className={styles.inputContainer}>
            <button onClick={sendMessage} className={styles.sendButton}>
              ارسال
            </button>
            <input
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
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
