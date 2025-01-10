import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { BsShop} from "react-icons/bs";
function Logo() {
  return (
      <Button size='icon' asChild>
        <Link href='/'>
          <BsShop className='w-8 h-8 text-black'/>
        </Link>
      </Button>
  )
}

export default Logo