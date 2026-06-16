"use client"
import React from 'react'
import Cart from '../../../../components/Cart'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';

const page = () => {
   const router = useRouter();
  return (
    <div className='min-h-screen bg-[#F7F3EE] px-6 py-10 md:py-20'>
      <div className="max-w-6xl mx-auto text-center pt-6">

      <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-1 text-sm text-gray-600 hover:text-black transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <Cart />
      </div>
    </div>
  )
}

export default page