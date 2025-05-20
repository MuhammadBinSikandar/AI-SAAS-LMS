import React from 'react'
import Image from 'next/image'
import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

function CourseCardItem({ course }) {

    return (
        <div className='border rounded-lg shadow-md p-3'>
            <div>
                <div className='flex justify-between items-center'>
                    <Image src={'/knowledge.png'} alt='other' height={50} width={50} />
                    <h2 className='text-[10px] p-1 px-2 rounded-full bg-blue-500 text-white'>19 May 2025</h2>
                </div>
                <h2 className='mt-3 line-clamp-2'>{course?.courseLayout.course_title}</h2>
                <p className='text-xs line-clamp-2 text-gray-500 mt-2'>{course?.courseLayout.CourseSummary}</p>
                <div className='flex justify-between items-center mt-3'>
                    <Progress value={0} />
                </div>
                <div className='flex justify-end items-center mt-3'>
                    {course?.status == 'Generating'
                        ? <h2 className='text-sm p-1 px-2 rounded-full flex items-center gap-2 bg-gray-400 text-white'> <RefreshCw className='h-5 w-5' /> Generating...</h2>
                        : <Button className={'bg-blue-500'}>View</Button>}
                </div>
            </div>
        </div>
    )
}

export default CourseCardItem
