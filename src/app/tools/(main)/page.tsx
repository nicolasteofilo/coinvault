'use client'

import { signOut, useSession } from 'next-auth/react'

export default function Tools() {
  const session = useSession()
  console.log(session)

  return (
    <div>
      {JSON.stringify(session)}
      <button onClick={() => signOut({ redirectTo: '/' })}>Sign out</button>
    </div>
  )
}
