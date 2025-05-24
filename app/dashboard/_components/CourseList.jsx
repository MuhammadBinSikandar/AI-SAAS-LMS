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
    // We will call the API whenever the User info is available
    useEffect(() => {
        user && GetCourseList();
    }, [user]);
    const GetCourseList = async () => {
        const result = await axios.post('/api/courses', { createdBy: user?.primaryEmailAddress?.emailAddress });
        console.log(result.data.result);
        setCourseList(result.data.result);
    }
    return (
        <div className='mt-10'>
            <h2 className='font-bold text-2xl'>You Study Material
                <Button> <RefreshCw /> Refresh</Button>
            </h2>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mt-2'>
                {courseList?.map((course, index) => (
                    <CourseCardItem course={course} key={index} />
                ))}
            </div>
        </div>
    )
}

export default CourseList
