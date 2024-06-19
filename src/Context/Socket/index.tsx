import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import io, { Socket } from 'socket.io-client'

interface ISocketContext {
  socket: Socket | null
}

const SocketContext = createContext<ISocketContext | null>(null)

export const useSocket = (): ISocketContext => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

interface SocketProviderProps {
  children: ReactNode
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const socketIo: Socket = io(
      `http://localhost:${process.env.PRODUCTION_PORT}`,
      {
        path: '/api/chat',
      }
    )

    setSocket(socketIo)

    const cleanup = () => {
      socketIo.disconnect()
    }

    return cleanup
  }, [])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}
