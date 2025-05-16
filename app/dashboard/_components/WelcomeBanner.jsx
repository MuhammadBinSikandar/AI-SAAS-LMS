"use client"
import React from 'react'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'

function WelcomeBanner() {
    const { user } = useUser();
    return (
        <div className='p-5 bg-blue-500 w-full text-white rounded-lg flex items-center gap-8' >
            <Image src={'/laptop.png'} alt='laptop' width={100} height={100} />
            <div>
                <h2 className='font-bold text-3xl'>Hello, {user?.fullName}</h2>
                <p>Welcome back, Let's get started with learning new Courses</p>
            </div>
        </div>

    )
}

export default WelcomeBanner
