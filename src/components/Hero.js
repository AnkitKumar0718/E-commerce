import React from 'react'
import Women from '../Img/Women.jpg';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className='bg-orange-100 h-[500px] bg-cover 
    bg-no-repeat bg-center py-24'>
      <div className='container mx-auto flex justify-around h-full '>
        <div className='flex flex-col justify-center mx-4'>
          <div className='flex font-semibold items-center uppercase '>
            <div></div>
            <div className='bg-red-500 w-10 h-[2px] mr-2'>
            </div>
            New Trend
          </div>
          <h1 className=' text-[60px] leading-[1.1] font-light mb-4 '>AUTUMN SALE STYLISH <br />
            <span className='font-semibold'>WOMENS</span>
          </h1>
          <div>
            <Link className='font-semibold uppercase border-b-2  border-primary' to={'/'}>
              Discover more
            </Link>
          </div>
        </div>

        <div className='hidden md:block my-4' style={{ marginRight: '2rem' }}>
          <img className='h-[400px] w-[380px] ' style={{ marginTop: '-2rem' }} src={Women} alt='' />
        </div>
      </div>
    </section>
  )
}

export default Hero
