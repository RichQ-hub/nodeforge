import { squada } from '@/fonts';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

import logoImg from '@/assets/Logo.svg';
import logoBanner from '@/assets/banner-bg.jpg';

const Navbar = () => {
  return (
    <nav className='pr-3 fixed top-0 left-0 right-0 h-14 flex items-center z-50 bg-nodeforge-nav border-b border-b-nodeforge-white-30'>
      {/* Logo Section */}
      {/* Banner */}
      <div
        className={`
          relative w-[340px] h-full overflow-hidden flex`
        }
      >
        <Link
          href='/'
          className={`${squada.className} flex items-center h-full text-2xl text-nodeforge-brand`}
        >
          <Image src={logoImg} alt='NodeForge Logo' className='h-5/6 mx-6'/>
          Node Forge
        </Link>

        <div className='absolute top-0 right-0 -z-10 w-full h-full bg-linear-140 from-[rgba(255, 255, 255, 0)] from-78%  to-nodeforge-nav to-86%'></div>

        <Image
          className='absolute top-0 -z-20 opacity-40'
          src={logoBanner}
          alt='Logo Banner'
        />
      </div>

      {/* Navlinks Section */}
      {/* <Navlinks /> */}
    </nav>
  )
}

export default Navbar;