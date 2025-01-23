import { useToast } from '@/hooks/use-toast'
import { SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
'use client'

function SignOutLinks() {
  const {toast} = useToast()

const handleLogout = () => {
  toast({description:'Logout Successfull'})
}

  return (
    <SignOutButton>
      <Link href='/' className='w-full text-left' onClick={handleLogout}>
      Logout
      </Link>
    </SignOutButton>
  )
}

export default SignOutLinks