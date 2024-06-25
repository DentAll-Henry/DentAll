'use client'
import React from 'react'
import MapComponent from '@/components/Maps/maps'

const AboutPage = () => {
  return (
    <div className="flex flex-row text-white">
      
      <div className='w-[50%] p-4'>
      <MapComponent />
      </div>

      <div>
<h1>Sobre nosotros</h1>
      </div>
    </div>
  );
}

export default AboutPage
