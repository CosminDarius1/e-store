import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { GiPolarBear } from "react-icons/gi";
function Logo() {
  return (
      <Button size='icon' asChild>
        <Link href='/'>
          <GiPolarBear className='w-8 h-8 text-yellow-300'/>
        </Link>
      </Button>
  )
}

export default Logo