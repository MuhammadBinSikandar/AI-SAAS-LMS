'use client'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation';
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader';
import axios from 'axios';
import { useState } from 'react';

function Course() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        getCourse();
    }, [])
    const getCourse = async () => {
        const result = await axios.get(`/api/courses?courseId=${courseId}`);
        console.log(result);
        setCourse(result.data.result);
    }
    return (
        <div>
            <DashboardHeader />
        </div>
    )
}

export default Course;
