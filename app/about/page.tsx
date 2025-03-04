import React from 'react'


function AboutPage() {

 
  return (
    <section>
      <h1 className='flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl'>
        About
        <span className='bg-primary py-2 px-4 rounded-lg tracking-widest text-white'>
          us
        </span>
      </h1>
      <p className='mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground'>
      At our store, we believe in offering more than just products – we offer a personalized shopping experience that reflects creativity, style, and individuality. From unique decor pieces to stylish accessories, every item in our collection is handpicked for its quality and charm. Our goal is to help you find items that bring joy and personality to your everyday life.
      </p>
    </section>
  )
}

export default AboutPage