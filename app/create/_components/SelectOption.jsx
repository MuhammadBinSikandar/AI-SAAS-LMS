import React from 'react'
import Image from 'next/image'

function SelectOption() {
    const Options = [
        {
            name: "Exam",
            icon: '/exam_1.png',
        },
        {
            name: "Job Interview",
            icon: '/job.png',
        },
        {
            name: "Practice",
            icon: '/practice.png',
        },
        {
            name: "Coding Prep",
            icon: '/code.png',
        },
        {
            name: "Other",
            icon: '/knowledge.png',
        }
    ]
    return (
        <div>
            <h2 className='center mb-2 text-lg'>
                For which you want to generate your personal study material?
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 '>
                {Options.map((option, index) => (
                    <div key={index} className='p-4 gap-5 flex flex-col items-center justify-center border rounded-xl '>
                        <Image src={option.icon} alt={option.name} width={50} height={50} />
                        <h2 className='text-sm'>{option.name}</h2>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default SelectOption
