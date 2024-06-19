export const sendMessage = async (newMessage: string, client: string) => {
  const response = await fetch('/api/chat', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      authType: '&M%e$A#g$e#I%n&Z*',
      message: newMessage,
      client: `${client}`,
    }),
  })
  console.log(await response.json())
  console.log(client)
}
export const getHistory = async () => {
  try {
    const response = await fetch('/api/chat/GET', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ authType: '!C#o$N%e^C&t*O$C#h$t%' }),
    })
    const data = await response.json()
    console.log(data)
    if (response.status === 200) {
      return data.message
    }
    if (response.status === 207) {
        // if(JSON.parse(
        //     localStorage.getItem('#B!@%$&K&E^T*O(s&') || '[]'
        //   ))
        return ''
      localStorage.setItem('*c(h)o&m%a^c$H#a#p@', JSON.stringify(data.user))
    }
  } catch (err) {
    console.log(err)
  }
}
