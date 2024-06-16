import React from 'react'
import { useRouter } from 'next/router'

const CustomComponent2 = () => {
  const router = useRouter()
  React.useEffect(() => {
    router.push('/address/add')
  }, [])

  return <div>Redirecting to /address/add...</div>
}

export default CustomComponent2
