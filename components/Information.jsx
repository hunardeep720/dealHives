import React from 'react'
import { useUserAuth } from '@/utils/auth-context';

function Information() {
  const { firebaseSignOut } = useUserAuth();
  async function handleSignOut() {
    await firebaseSignOut();
  }
  return (
    <div><button onClick={handleSignOut}>signout</button></div>
  )
}

export default Information