"use client"
import React from 'react'
import SelectOption from './_components/SelectOption'
import { useState } from 'react'

function Create() {
    const [step, setStep] = useState(0);
    return (
        <div className='flex flex-col items-center mt-15 p-5 md:px-24 lg:px-36'>
            <h2 className='font-bold text-4xl text-blue-700'>Start Building Your Personal Study Material</h2>
            <p className='text-gray-500 text-lg'>Fill all details to generate study material for you next project</p>
            <div className='mt-10'>
                {step == 0 ? <SelectOption /> : null}
            </div>
        </div>
    )
}

export default Create
