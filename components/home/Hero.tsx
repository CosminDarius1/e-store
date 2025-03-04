import React from 'react'
import HeroCarousel from './HeroCarousel'
import { Button } from '../ui/button'
import Link from 'next/link'

function Hero() {
  return (
    <section className='grid grid-cols-1 lg:grid-cols-2 gap-24 items-center'>
      <div>
        <h1 className='max-w-xl font-bold text-4xl tracking-tight sm:text-6xl'>
        Shopping for Everyone
        </h1>
        <p className='mt-8 max-w-xl text-lg leading-8 text-muted-foreground'>
        We’re here to offer a fresh approach to shopping, featuring unique, high-quality products that add a touch of personality to your life. Whether it’s fun decor or stylish accessories, every item is handpicked for its charm and quality. Enjoy a simple, enjoyable shopping experience that’s all about you!
        </p>
        <Button asChild size='lg' className='mt-10'>
          <Link href='/products'>Our products</Link>
        </Button>
      </div>
        <HeroCarousel/>
    </section>
  )
}

export default Hero
