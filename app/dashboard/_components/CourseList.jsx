"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CourseCardItem from './CourseCardItem';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

function CourseList() {
    const { user } = useUser();
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    // We will call the API whenever the User info is available
    useEffect(() => {
        user && GetCourseList();
    }, [user]);
    const GetCourseList = async () => {
        setLoading(true);
        const result = await axios.post('/api/courses', { createdBy: user?.primaryEmailAddress?.emailAddress });
        console.log(result.data.result);
        setCourseList(result.data.result);
        setLoading(false);
    }
    return (
        <div className='mt-10'>
            <h2 className='font-bold text-2xl flex justify-between items-center'>You Study Material
                <Button variant={'outline'} className='border-blue-50 text-primary cursor-pointer' onClick={GetCourseList}> <RefreshCw /> Refresh</Button>
            </h2>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mt-2'>
                {loading == false ? courseList?.map((course, index) => (
                    <CourseCardItem course={course} key={index} />
                ))
                    : [1, 2, 3, 4, 5, 6].map((Item, index) => (
                        <div key={index} className='h-56 w-full bg-slate-200 animate-pulse rounded-lg'>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CourseList
